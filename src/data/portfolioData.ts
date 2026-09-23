export interface Project {
  id: string;
  title: string;
  category: 'GenAI & LLMs' | 'Computer Vision' | 'Applied ML & Graphs' | 'Systems';
  tagline: string;
  year: string;
  role: string;
  image: string;
  summary: string;
  metrics: { label: string; value: string }[];
  problem: string;
  architecture: string;
  highlights: string[];
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
}

export interface ExperienceItem {
  period: string;
  role: string;
  organization: string;
  location: string;
  type: string;
  description: string;
  achievements: string[];
  skills: string[];
}

export interface SkillCategory {
  title: string;
  description: string;
  items: string[];
}

export const PORTFOLIO_DATA = {
  personal: {
    name: 'Pradeesha S',
    title: 'AI & Machine Learning Engineer',
    bio: 'Artificial intelligence specialist focused on generative AI systems, high-throughput inference architectures, and computer vision. Committed to bringing algorithmic rigor and verifiable reliability to production AI systems.',
    email: 'pradee1813@gmail.com',
    linkedin: 'https://www.linkedin.com/in/pradeesha-s-ai/',
    location: 'Bangalore, India',
    availability: 'Open to AI Engineering, Research & Advisory Roles',
    stats: [
      { label: 'Target Model Reliability', value: '99.4%' },
      { label: 'Sub-50ms Inference Latency', value: '<42ms' },
      { label: 'Shipped Production Pipelines', value: '12+' },
      { label: 'Quantized Optimization Gain', value: '3.4x' },
    ],
  },

  focusAreas: [
    {
      index: '01',
      title: 'Generative AI & Agentic Architectures',
      description:
        'Architecting low-hallucination agentic systems, production RAG pipelines with hybrid semantic reranking, and parameter-efficient fine-tuning (PEFT/QLoRA) for domain-adapted foundation models.',
      deliverables: [
        'Multi-hop retrieval engines with vector & BM25 hybrid indices',
        'Structured tool-calling and constrained schema validation',
        'Self-reflective guardrails and automated hallucination scoring',
      ],
    },
    {
      index: '02',
      title: 'Computer Vision & Multimodal Perception',
      description:
        'Developing real-time visual inspection, dense object detection, and multimodal classification pipelines engineered for edge devices and accelerated inference runtimes.',
      deliverables: [
        'TensorRT and ONNX-accelerated edge perception pipelines',
        'Spatial feature extraction and anomaly localization with Grad-CAM',
        'Vision-Language zero-shot open vocabulary classification',
      ],
    },
    {
      index: '03',
      title: 'Algorithmic Optimization & ML Infrastructure',
      description:
        'Grounding modern machine learning systems in computational geometry, graph theory, and distributed inference topologies for minimal hardware latency and cost efficiency.',
      deliverables: [
        '4-bit and 8-bit model quantization via AWQ and GPTQ',
        'Continuous batching and KV-cache memory management',
        'Scalable REST and gRPC model-serving microservices',
      ],
    },
  ],

  projects: [
    {
      id: 'optigraph-engine',
      title: 'OptiGraph: Combinatorial Graph Partitioning & Scheduling',
      category: 'Applied ML & Graphs' as const,
      tagline: 'GNN-guided heuristic solver for high-concurrency multi-agent workload distribution.',
      year: '2025',
      role: 'Lead ML Engineer',
      image: '/src/assets/images/ai_neural_viz_1790162631427.jpg',
      summary:
        'A hybrid deep learning and combinatorial optimization system that predicts optimal graph partitioning boundaries for distributed compute clusters, reducing inter-node communication latency by 38%.',
      metrics: [
        { label: 'Latency Drop', value: '-38%' },
        { label: 'Node Throughput', value: '2.4x' },
        { label: 'Convergence Speed', value: '4.8x' },
      ],
      problem:
        'Traditional integer linear programming and spectral graph partitioning algorithms suffer from combinatorial explosion when scaling past 50,000 vertices, leading to significant task allocation bottlenecks in real-time systems.',
      architecture:
        'Constructed a 4-layer Graph Convolutional Network (GCN) with Edge-Conditioned Conv operators that ingests dynamic topologies and produces learned node embeddings. A lightweight Monte Carlo Tree Search (MCTS) decodes the embeddings into partition cuts.',
      highlights: [
        'Scales to 250,000+ nodes in under 220ms inference time',
        'Formulated custom conflict-free penalty loss functions inspired by graph chromatic theory',
        'Deployed with LibTorch C++ bindings for zero-copy memory exchange',
      ],
      technologies: ['PyTorch Geometric', 'C++ / LibTorch', 'NetworkX', 'CUDA', 'FastAPI'],
      githubUrl: 'https://github.com/pradeesha-s-ai/optigraph-solver',
    },
    {
      id: 'docucontext-rag',
      title: 'DocuContext: Zero-Hallucination Enterprise RAG System',
      category: 'GenAI & LLMs' as const,
      tagline: 'Multi-stage retrieval augmented generation pipeline with verifiable token attribution.',
      year: '2025',
      role: 'AI System Architect',
      image: '/src/assets/images/ai_neural_viz_1790162631427.jpg',
      summary:
        'An enterprise-grade document intelligence platform designed to eliminate hallucinations by marrying dense vector retrieval with reciprocal rank fusion (RRF) and semantic span verification.',
      metrics: [
        { label: 'Hallucination Rate', value: '<0.6%' },
        { label: 'Retrieval Recall@5', value: '96.2%' },
        { label: 'P95 Query Latency', value: '185ms' },
      ],
      problem:
        'Standard naive vector databases fail on dense tabular technical reports, yielding out-of-context chunks and confident model confabulations that prevent production enterprise adoption.',
      architecture:
        'Hierarchical document chunking with metadata enrichment, dual-indexing across ChromaDB and BM25, Cohere reranking, and a fine-tuned lightweight validator model that highlights source spans before generating answers.',
      highlights: [
        'Automatic tabular parser converts markdown and PDF tables to relational semantic triples',
        'Implemented streaming citation links directly back to exact page bounding boxes',
        'Cost-optimized query routing that executes small SLMs for simple facts and 70B models for multi-hop synthesis',
      ],
      technologies: ['LangChain', 'ChromaDB', 'vLLM', 'FastAPI', 'Hugging Face', 'Docker'],
      githubUrl: 'https://github.com/pradeesha-s-ai/docucontext-rag',
    },
    {
      id: 'visionpulse-edge',
      title: 'VisionPulse: High-Speed Edge Anomaly Detection',
      category: 'Computer Vision' as const,
      tagline: 'Real-time multi-stream industrial defect classification at 60 FPS on edge accelerators.',
      year: '2024',
      role: 'Computer Vision Engineer',
      image: '/src/assets/images/ai_vision_viz_1790162643083.jpg',
      summary:
        'A compact vision transformer pipeline fine-tuned for high-speed manufacturing lines, performing micron-level surface anomaly detection under variable lighting environments.',
      metrics: [
        { label: 'Inference Speed', value: '62 FPS' },
        { label: 'False Positive Rate', value: '<0.4%' },
        { label: 'Model Size (INT8)', value: '18.4 MB' },
      ],
      problem:
        'Cloud-based computer vision inspections incur unacceptable network latency and bandwidth costs, while existing lightweight mobile models fail to detect sub-millimeter cracks under shifting shop-floor illumination.',
      architecture:
        'Trained a custom patch-based Vision Transformer with self-supervised contrastive pre-training on industrial textures. Compiled model graphs into TensorRT INT8 engines with hardware calibration profiles.',
      highlights: [
        'Delivered 62 frames per second sustained throughput on NVIDIA Jetson Orin Nano',
        'Integrated Grad-CAM visual heatmaps for immediate human-in-the-loop auditability',
        'Resilient against dust particles and lighting variance through photometric data augmentation',
      ],
      technologies: ['PyTorch', 'TensorRT', 'OpenCV', 'NVIDIA DeepStream', 'ONNX', 'Python'],
      githubUrl: 'https://github.com/pradeesha-s-ai/visionpulse-edge',
    },
    {
      id: 'llm-infer-turbo',
      title: 'vQuant: Low-Bit Quantization & Serving Microservice',
      category: 'Systems' as const,
      tagline: '4-bit AWQ weight quantization harness for local LLM inference efficiency.',
      year: '2024',
      role: 'ML Infrastructure Lead',
      image: '/src/assets/images/ai_neural_viz_1790162631427.jpg',
      summary:
        'Custom inference server implementation enabling 70B parameter models to run with near-FP16 perplexity on cost-efficient consumer and workstation GPUs.',
      metrics: [
        { label: 'VRAM Compression', value: '3.8x' },
        { label: 'Perplexity Delta', value: '+0.08' },
        { label: 'Tokens/Sec/User', value: '84 t/s' },
      ],
      problem:
        'Deploying full-precision 16-bit foundation models requires expensive multi-GPU A100/H100 clusters, creating substantial infrastructure costs for seed-stage projects and private on-premise deployments.',
      architecture:
        'Implemented activation-aware weight quantization (AWQ) with fused CUDA kernels, continuous paged-attention scheduling, and custom request pooling in Rust/C++.',
      highlights: [
        'Reduced 70B model GPU memory footprint from 140 GB down to 36.8 GB',
        'Zero noticeable quality degradation on standard MMLU and GSM8K benchmarks',
        'Includes live Prometheus and OpenTelemetry monitoring hooks for token velocity',
      ],
      technologies: ['CUDA', 'C++', 'vLLM', 'Python', 'Docker', 'Prometheus'],
      githubUrl: 'https://github.com/pradeesha-s-ai/vquant-server',
    },
    {
      id: 'biomed-anomaly',
      title: 'BioMed-Scan: Multi-Class Clinical Imaging Triage',
      category: 'Computer Vision' as const,
      tagline: 'Explainable neural network for automated radiograph screening and triage prioritization.',
      year: '2023',
      role: 'Research & ML Developer',
      image: '/src/assets/images/ai_vision_viz_1790162643083.jpg',
      summary:
        'Deep learning diagnostic assistant built to assist clinical radiologists by automatically pre-screening chest radiographs and categorizing priority anomalies.',
      metrics: [
        { label: 'AUROC Score', value: '0.942' },
        { label: 'Sensitivity', value: '95.8%' },
        { label: 'Triage Time Saved', value: '65%' },
      ],
      problem:
        'High patient volume in diagnostic centers causes critical turnaround delays in identifying acute pulmonary anomalies requiring urgent interventions.',
      architecture:
        'Ensemble architecture of DenseNet-121 and EfficientNet-B4 trained with focal loss to combat severe class imbalance across 14 distinct pathological classifications.',
      highlights: [
        'Generates pixel-aligned saliency maps for immediate radiologist verification',
        'Rigorous cross-hospital validation ensuring robust demographic generalization',
        'Presented findings in technical collegiate symposium with first-prize paper honor',
      ],
      technologies: ['PyTorch', 'TorchVision', 'Scikit-learn', 'Pandas', 'Streamlit'],
      githubUrl: 'https://github.com/pradeesha-s-ai/biomed-scan',
    },
  ],

  experience: [
    {
      period: '2024 — Present',
      role: 'AI & Machine Learning Engineer',
      organization: 'Applied AI & Cognitive Computing Labs',
      location: 'Bangalore, India',
      type: 'Full-Time',
      description:
        'Leading architecture and deployment of generative AI systems, domain fine-tuning pipelines, and high-performance neural inference servers.',
      achievements: [
        'Engineered enterprise RAG and LLM tool-use systems serving over 150,000 weekly queries with <200ms P95 latency.',
        'Developed end-to-end model distillation pipelines shrinking proprietary 14B parameter models into quantized 3B variants with 94% retention of capability.',
        'Established automated red-teaming, hallucination metrics, and test datasets for continuous model evaluation.',
      ],
      skills: ['PyTorch', 'vLLM', 'Transformers', 'LangChain', 'Docker', 'FastAPI'],
    },
    {
      period: '2023 — 2024',
      role: 'Computer Vision & Deep Learning Specialist',
      organization: 'Intelligent Systems Research Group',
      location: 'Bangalore, India',
      type: 'Research & Engineering',
      description:
        'Designed lightweight neural architectures for edge vision systems, robotic anomaly detection, and embedded perception devices.',
      achievements: [
        'Built real-time object tracking and classification pipeline operating at 60 FPS on edge accelerators.',
        'Collaborated on combinatorial graph problem formulations for efficient spatial allocation and routing.',
        'Mentored junior engineers on PyTorch best practices, profiling GPU kernels, and TensorRT compilation.',
      ],
      skills: ['TensorRT', 'Computer Vision', 'CUDA', 'OpenCV', 'Python', 'Git'],
    },
    {
      period: '2020 — 2024',
      role: 'B.Tech in Artificial Intelligence & Computer Science',
      organization: 'Academic & Engineering Honors',
      location: 'India',
      type: 'Education',
      description:
        'Graduated with First Class with Distinction. Focused on Algorithms, Machine Learning, Graph Theory, and Natural Language Processing.',
      achievements: [
        'First Prize in Inter-College AI-TOM Technical Project Contest for innovative computer vision triage system.',
        'Authored research reports on graph coloring, parameterized complexity, and combinatorial scheduling.',
        'Active leader in student technical associations and peer programming mentorship programs.',
      ],
      skills: ['Data Structures', 'Machine Learning', 'Graph Theory', 'C++', 'Linear Algebra'],
    },
  ],

  skillsMatrix: [
    {
      title: 'Machine Learning & Deep Learning',
      description: 'Foundational mathematics, model architectures, and training methodologies.',
      items: [
        'Deep Neural Networks (CNNs, Transformers, GNNs)',
        'Loss Formulations & Regularization',
        'Parameter-Efficient Fine-Tuning (LoRA, QLoRA)',
        'Contrastive & Self-Supervised Learning',
        'Model Quantization (AWQ, GPTQ, INT8)',
        'Statistical Evaluation & Anomaly Scoring',
      ],
    },
    {
      title: 'Generative AI & Natural Language',
      description: 'Production systems for foundation models, retrieval, and autonomous agents.',
      items: [
        'RAG Architectures (Hybrid BM25 + Vector)',
        'Prompt Optimization & Structured JSON Output',
        'Vector Embeddings & Semantic Search (FAISS, Chroma)',
        'Agentic Workflows & Tool Calling',
        'vLLM & Continuous Batching Engines',
        'Evaluation Frameworks (Ragas, Trulens)',
      ],
    },
    {
      title: 'Computer Vision & Multimodal',
      description: 'Visual perception, detection, and edge hardware deployment.',
      items: [
        'Object Detection & Segmentation (YOLO, Mask R-CNN)',
        'Vision Transformers (ViT) & Patch Embeddings',
        'TensorRT & ONNX Runtime Acceleration',
        'Edge AI Deployments (NVIDIA Jetson)',
        'Grad-CAM Saliency & Model Explainability',
        'OpenCV Image Processing Pipelines',
      ],
    },
    {
      title: 'Engineering & Infrastructure',
      description: 'Production software architecture, deployment, and performance tooling.',
      items: [
        'Python, TypeScript, C++, SQL',
        'PyTorch, Hugging Face, Scikit-Learn',
        'FastAPI, Express.js, Docker, Git',
        'PostgreSQL, Redis, Vector Databases',
        'Linux System Administration & Shell Scripting',
        'GPU Profiling & Latency Benchmarking',
      ],
    },
  ],

  publications: [
    {
      title: 'Conflict-Free Parameterized Formulations in Distributed Agent Networks',
      venue: 'Symposium on Applied Algorithms & Optimization',
      year: '2024',
      type: 'Technical Paper',
      description:
        'Investigation into minimum conflict-free graph coloring algorithms applied to frequency and channel allocation in dense heterogeneous edge clusters.',
    },
    {
      title: 'Explainable Triage Systems for High-Throughput Clinical Screening',
      venue: 'AI-TOM Engineering Conference',
      year: '2023',
      type: 'Project Award & Paper',
      description:
        'First-place award paper detailing multi-class radiograph anomaly localization with real-time class activation mapping.',
    },
  ],
};
