import React, { useState, useMemo } from 'react';
import { Cpu, Server, Zap, HardDrive, RefreshCw, Info } from 'lucide-react';

interface ModelPreset {
  name: string;
  params: number; // in billions
  architecture: string;
  layers: number;
  hiddenDim: number;
  numHeads: number;
}

const MODELS: ModelPreset[] = [
  { name: 'Llama 3 8B', params: 8.03, architecture: 'Dense Transformer', layers: 32, hiddenDim: 4096, numHeads: 32 },
  { name: 'Mistral 7B v0.3', params: 7.24, architecture: 'Dense Transformer', layers: 32, hiddenDim: 4096, numHeads: 32 },
  { name: 'Llama 3 70B', params: 70.6, architecture: 'Dense Transformer', layers: 80, hiddenDim: 8192, numHeads: 64 },
  { name: 'Mixtral 8x7B (MoE)', params: 46.7, architecture: 'Sparse Mixture of Experts', layers: 32, hiddenDim: 4096, numHeads: 32 },
  { name: 'ViT-Large Perception', params: 0.31, architecture: 'Vision Transformer', layers: 24, hiddenDim: 1024, numHeads: 16 },
];

export const AiPlayground: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<ModelPreset>(MODELS[0]);
  const [precision, setPrecision] = useState<'FP16' | 'INT8' | 'INT4'>('INT4');
  const [batchSize, setBatchSize] = useState<number>(4);
  const [contextLength, setContextLength] = useState<number>(4096);
  const [usePagedAttention, setUsePagedAttention] = useState<boolean>(true);

  // Calculation logic
  const calculation = useMemo(() => {
    // Bits per parameter
    const bitsPerWeight = precision === 'FP16' ? 16 : precision === 'INT8' ? 8 : 4;
    const bytesPerWeight = bitsPerWeight / 8;

    // Weights VRAM in GB (with 1.15 overhead factor for optimizer/CUDA context)
    const weightsVRAM = selectedModel.params * bytesPerWeight * 1.05;

    // KV Cache VRAM calculation:
    // 2 * num_layers * num_heads * (hidden_dim / num_heads) * context_length * batch_size * precision_bytes
    // = 2 * layers * hiddenDim * context_length * batchSize * 2 bytes (FP16 KV)
    const kvCacheBytesPerToken = 2 * selectedModel.layers * selectedModel.hiddenDim * 2; // in bytes
    const rawKvCacheBytes = kvCacheBytesPerToken * contextLength * batchSize;
    const kvCacheVRAM = rawKvCacheBytes / (1024 * 1024 * 1024);

    // PagedAttention reduces fragmentation from ~30% down to ~4%
    const fragmentationMultiplier = usePagedAttention ? 1.05 : 1.35;
    const totalKvCache = kvCacheVRAM * fragmentationMultiplier;

    // Runtime CUDA activation buffer
    const activationBuffer = Math.min(2.5, 0.4 + batchSize * 0.08);

    const totalVRAM = weightsVRAM + totalKvCache + activationBuffer;

    // Hardware recommendation mapping
    let hardware = '';
    let hardwareClass = '';
    if (totalVRAM <= 12) {
      hardware = 'NVIDIA RTX 4070 / Jetson AGX Orin (16GB)';
      hardwareClass = 'Edge & Compact Workstation';
    } else if (totalVRAM <= 24) {
      hardware = 'Single NVIDIA RTX 4090 / A10G (24GB)';
      hardwareClass = 'Single Consumer/Pro GPU Node';
    } else if (totalVRAM <= 48) {
      hardware = 'Single NVIDIA A40 / RTX 6000 Ada (48GB)';
      hardwareClass = 'High-Memory Workstation Node';
    } else if (totalVRAM <= 80) {
      hardware = 'NVIDIA A100 / H100 SXM (80GB)';
      hardwareClass = 'Enterprise Cloud Accelerator';
    } else {
      const gpusNeeded = Math.ceil(totalVRAM / 80);
      hardware = `${gpusNeeded}x Tensor-Parallel H100 (80GB) Cluster`;
      hardwareClass = 'Distributed Multi-GPU Topology';
    }

    // Throughput estimation (tokens/sec) based on memory bandwidth
    const assumedBandwidthGBs = totalVRAM > 24 ? 1500 : 900;
    const estimatedTokensPerSec = Math.round(
      Math.max(12, (assumedBandwidthGBs / (selectedModel.params * bytesPerWeight)) * (1 + Math.log2(batchSize) * 0.45))
    );

    const p95LatencyMs = Math.round((1000 / estimatedTokensPerSec) * 1.4 + (contextLength / 1024) * 8);

    return {
      weightsVRAM: weightsVRAM.toFixed(2),
      totalKvCache: totalKvCache.toFixed(2),
      activationBuffer: activationBuffer.toFixed(2),
      totalVRAM: totalVRAM.toFixed(2),
      hardware,
      hardwareClass,
      estimatedTokensPerSec,
      p95LatencyMs,
    };
  }, [selectedModel, precision, batchSize, contextLength, usePagedAttention]);

  return (
    <section id="playground" className="py-20 border-b border-stone-200 bg-stone-50/60">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl mb-12 space-y-2">
          <div className="text-xs uppercase tracking-wider text-stone-500 font-semibold font-mono-code">
            Interactive AI Lab
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl text-stone-900 font-normal tracking-tight [text-wrap:balance]">
            Inference latency &amp; memory topology simulator.
          </h2>
          <p className="text-stone-600 text-sm sm:text-base font-light leading-relaxed">
            Test how model parameters, 4-bit/8-bit quantization schemes, and KV cache allocation dictate GPU VRAM requirements and token throughput in production.
          </p>
        </div>

        {/* Simulator Workbench */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-6 bg-white border border-stone-200 rounded-2xl p-6 sm:p-7 space-y-6 shadow-xs">
            {/* Model Architecture Selection */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 font-mono-code mb-2">
                1. Foundation Model Architecture
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {MODELS.map((m) => (
                  <button
                    key={m.name}
                    onClick={() => setSelectedModel(m)}
                    className={`px-3 py-2 text-left rounded-lg border text-xs transition-colors ${
                      selectedModel.name === m.name
                        ? 'border-stone-900 bg-stone-900 text-white font-medium shadow-xs'
                        : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    <div className="font-medium truncate">{m.name}</div>
                    <div className={`text-[10px] mt-0.5 ${selectedModel.name === m.name ? 'text-stone-300' : 'text-stone-400'}`}>
                      {m.params}B params
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Precision / Quantization */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 font-mono-code">
                  2. Weight Quantization Format
                </label>
                <span className="text-[11px] text-stone-400 font-mono-code">
                  {precision === 'INT4' ? '4-Bit AWQ / GPTQ' : precision === 'INT8' ? '8-Bit SmoothQuant' : '16-Bit Half-Precision'}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {(['FP16', 'INT8', 'INT4'] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPrecision(p)}
                    className={`py-2 px-3 text-xs font-medium rounded-lg border text-center transition-colors ${
                      precision === p
                        ? 'border-stone-900 bg-stone-900 text-white shadow-xs'
                        : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    {p}
                    <div className={`text-[10px] ${precision === p ? 'text-stone-300' : 'text-stone-400'}`}>
                      {p === 'FP16' ? '2.0 B/param' : p === 'INT8' ? '1.0 B/param' : '0.5 B/param'}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Sliders: Batch Size and Context Window */}
            <div className="space-y-4 pt-2 border-t border-stone-100">
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-medium text-stone-700">Batch Size (Concurrent Streams)</span>
                  <span className="font-mono-code font-bold text-stone-900 tabular-nums">{batchSize}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="32"
                  step="1"
                  value={batchSize}
                  onChange={(e) => setBatchSize(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-stone-900"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-medium text-stone-700">Sequence Context Window</span>
                  <span className="font-mono-code font-bold text-stone-900 tabular-nums">{contextLength.toLocaleString()} tokens</span>
                </div>
                <input
                  type="range"
                  min="512"
                  max="16384"
                  step="512"
                  value={contextLength}
                  onChange={(e) => setContextLength(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-stone-900"
                />
              </div>
            </div>

            {/* Paged Attention Toggle */}
            <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
              <div>
                <div className="text-xs font-medium text-stone-900">vLLM PagedAttention Memory Optimization</div>
                <div className="text-[11px] text-stone-500">Eliminates virtual memory internal fragmentation</div>
              </div>
              <button
                type="button"
                onClick={() => setUsePagedAttention(!usePagedAttention)}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  usePagedAttention ? 'bg-stone-900' : 'bg-stone-200'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                    usePagedAttention ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Real-time Calculation Readout Column */}
          <div className="lg:col-span-6 bg-white border border-stone-200 rounded-2xl p-6 sm:p-7 space-y-6 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-700 font-mono-code flex items-center gap-1.5">
                <HardDrive className="w-4 h-4 text-stone-800" />
                VRAM Physics &amp; Serving Metrics
              </span>
              <span className="text-xs font-mono-code text-stone-400">Live Simulation</span>
            </div>

            {/* Primary VRAM Metric Box */}
            <div className="p-5 bg-stone-50 border border-stone-200 rounded-xl space-y-2">
              <div className="flex items-baseline justify-between">
                <span className="text-xs font-medium text-stone-600">Total GPU VRAM Footprint</span>
                <span className="font-mono-code text-3xl font-bold text-stone-900 tracking-tight tabular-nums">
                  {calculation.totalVRAM} <span className="text-lg font-normal text-stone-500">GB</span>
                </span>
              </div>

              {/* Memory breakdown bar */}
              <div className="w-full h-2 rounded-full bg-stone-200 overflow-hidden flex">
                <div
                  style={{ width: `${(parseFloat(calculation.weightsVRAM) / parseFloat(calculation.totalVRAM)) * 100}%` }}
                  className="bg-stone-900"
                  title="Weights VRAM"
                />
                <div
                  style={{ width: `${(parseFloat(calculation.totalKvCache) / parseFloat(calculation.totalVRAM)) * 100}%` }}
                  className="bg-blue-600"
                  title="KV Cache"
                />
                <div
                  style={{ width: `${(parseFloat(calculation.activationBuffer) / parseFloat(calculation.totalVRAM)) * 100}%` }}
                  className="bg-amber-500"
                  title="CUDA Activation Buffer"
                />
              </div>

              {/* Legend with clean unboxed text */}
              <div className="pt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-stone-600 font-mono-code">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-stone-900 inline-block" />
                  Weights: {calculation.weightsVRAM} GB
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-blue-600 inline-block" />
                  KV Cache: {calculation.totalKvCache} GB
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
                  Context: {calculation.activationBuffer} GB
                </span>
              </div>
            </div>

            {/* Hardware Recommendation Card */}
            <div className="p-4 border border-stone-200 rounded-xl space-y-1.5 bg-white">
              <div className="text-[11px] font-mono-code uppercase tracking-wider text-stone-400">
                Recommended Hardware Class
              </div>
              <div className="font-semibold text-stone-900 text-sm sm:text-base flex items-center gap-2">
                <Server className="w-4 h-4 text-stone-700 shrink-0" />
                <span>{calculation.hardware}</span>
              </div>
              <div className="text-xs text-stone-500">{calculation.hardwareClass}</div>
            </div>

            {/* Throughput & Latency Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl space-y-0.5">
                <div className="text-[11px] font-mono-code text-stone-500">Generation Velocity</div>
                <div className="font-mono-code text-2xl font-bold text-stone-900 tabular-nums">
                  ~{calculation.estimatedTokensPerSec} <span className="text-xs font-normal text-stone-500">t/s</span>
                </div>
                <div className="text-[10px] text-stone-400">Aggregate stream rate</div>
              </div>

              <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl space-y-0.5">
                <div className="text-[11px] font-mono-code text-stone-500">Estimated P95 TTFT</div>
                <div className="font-mono-code text-2xl font-bold text-stone-900 tabular-nums">
                  {calculation.p95LatencyMs} <span className="text-xs font-normal text-stone-500">ms</span>
                </div>
                <div className="text-[10px] text-stone-400">Time-to-first-token estimate</div>
              </div>
            </div>

            {/* Engineering Insight */}
            <div className="flex items-start gap-2 text-xs text-stone-500 bg-stone-100/50 p-3 rounded-lg border border-stone-200/60">
              <Info className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                Notice how switching from FP16 to INT4 compresses the weights by ~3.8x while preserving attention head geometry, allowing {selectedModel.name} to run on cost-effective hardware.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
