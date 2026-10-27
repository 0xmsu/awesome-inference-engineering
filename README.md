<!-- Generated from data/ by scripts/build-readme.ts. Edit the YAML files in data/, not this file. -->

# Awesome Inference Engineering

A curated, continuously verified map of inference engineering: the tools, techniques, hardware, and knowledge for serving AI models fast, cheaply, and reliably, from GPU kernels to global fleets.

[![Entries](https://img.shields.io/badge/entries-658-0a7e5c)](#contents) [![Last verified](https://img.shields.io/badge/verified-2026--10--27-0a7e5c)](data/generated/metadata.json) [![Content license: CC0-1.0](https://img.shields.io/badge/content-CC0--1.0-lightgrey)](LICENSE)

**[Website](https://0xmsu.github.io/awesome-inference-engineering/)** · **[Catalog](https://0xmsu.github.io/awesome-inference-engineering/catalog/)** · **[Contributing](CONTRIBUTING.md)** · **[JSON](https://0xmsu.github.io/awesome-inference-engineering/api/entries.json)**

**Legend:** ⭐ editor's pick · 💲 commercial · ⚠️ maintenance mode · 🧪 experimental · 📄 paper · 📖 book · 🎓 course

## Contents

- [Start Here](#start-here) <sub>10</sub>
- [Inference Engines](#inference-engines) <sub>46</sub>
  - [Datacenter Engines](#datacenter-engines)
  - [Local & Desktop Runtimes](#local--desktop-runtimes)
  - [Hybrid CPU–GPU & Offloading](#hybrid-cpugpu--offloading)
  - [Language-Native Runtimes](#language-native-runtimes)
  - [Minimal & Educational Engines](#minimal--educational-engines)
- [Distributed Serving & Orchestration](#distributed-serving--orchestration) <sub>48</sub>
  - [Distributed & Disaggregated Serving](#distributed--disaggregated-serving)
  - [Kubernetes-Native Inference](#kubernetes-native-inference)
  - [Serving Frameworks & Platforms](#serving-frameworks--platforms)
  - [Autoscaling, Scheduling & Multi-Cloud](#autoscaling-scheduling--multi-cloud)
  - [Model Packaging, Loading & Cold Starts](#model-packaging-loading--cold-starts)
- [Gateways & Routing](#gateways--routing) <sub>23</sub>
  - [AI Gateways](#ai-gateways)
  - [Agent & MCP Gateways](#agent--mcp-gateways)
  - [Model Routing & Cascades](#model-routing--cascades)
  - [API Specs & Protocols](#api-specs--protocols)
- [Model Compression](#model-compression) <sub>26</sub>
  - [Quantization Toolkits](#quantization-toolkits)
  - [Number Formats & Specs](#number-formats--specs)
  - [Pruning, Sparsity & Distillation](#pruning-sparsity--distillation)
- [Decoding Acceleration](#decoding-acceleration) <sub>22</sub>
  - [Speculative Decoding](#speculative-decoding)
  - [Drafter Training](#drafter-training)
  - [Structured Outputs & Constrained Decoding](#structured-outputs--constrained-decoding)
- [KV Cache & Attention](#kv-cache--attention) <sub>32</sub>
  - [KV Cache Management & Offloading](#kv-cache-management--offloading)
  - [KV Compression & Eviction](#kv-compression--eviction)
  - [Prefix & Prompt Caching](#prefix--prompt-caching)
  - [Sparse, Linear & Hybrid Attention](#sparse-linear--hybrid-attention)
- [Scheduling & Parallelism](#scheduling--parallelism) <sub>31</sub>
  - [Batching & Scheduling](#batching--scheduling)
  - [Prefill–Decode Disaggregation](#prefilldecode-disaggregation)
  - [Parallelism & MoE Serving](#parallelism--moe-serving)
  - [Long-Context Inference](#long-context-inference)
  - [Multi-LoRA & Multi-Tenant Serving](#multi-lora--multi-tenant-serving)
- [Kernels & GPU Programming](#kernels--gpu-programming) <sub>49</sub>
  - [Kernel Libraries](#kernel-libraries)
  - [Kernel Languages & DSLs](#kernel-languages--dsls)
  - [Megakernels & Superoptimizers](#megakernels--superoptimizers)
  - [Collective Communication](#collective-communication)
  - [AI-Generated Kernels & Kernel Benchmarks](#ai-generated-kernels--kernel-benchmarks)
- [Compilers & Graph Runtimes](#compilers--graph-runtimes) <sub>19</sub>
  - [PyTorch Compilation Stack](#pytorch-compilation-stack)
  - [Vendor Runtimes](#vendor-runtimes)
  - [Open Compiler Stacks](#open-compiler-stacks)
- [Hardware & Accelerators](#hardware--accelerators) <sub>45</sub>
  - [NVIDIA](#nvidia)
  - [AMD](#amd)
  - [Google TPU](#google-tpu)
  - [AWS Trainium & Inferentia](#aws-trainium--inferentia)
  - [Other Accelerators & ASICs](#other-accelerators--asics)
  - [Interconnects & Networking](#interconnects--networking)
  - [Hardware Analysis](#hardware-analysis)
- [Benchmarking & Capacity Planning](#benchmarking--capacity-planning) <sub>30</sub>
  - [Benchmark Tools](#benchmark-tools)
  - [Suites & Leaderboards](#suites--leaderboards)
  - [Workload Traces & Datasets](#workload-traces--datasets)
  - [Simulators & Capacity Planners](#simulators--capacity-planners)
  - [Metrics & Methodology](#metrics--methodology)
- [Observability & Operations](#observability--operations) <sub>31</sub>
  - [Profiling & Debugging](#profiling--debugging)
  - [Monitoring & Telemetry](#monitoring--telemetry)
  - [Correctness & Determinism](#correctness--determinism)
  - [Cost & Energy Efficiency](#cost--energy-efficiency)
  - [Security & Confidential Inference](#security--confidential-inference)
- [Edge, Mobile & Browser](#edge-mobile--browser) <sub>33</sub>
  - [Mobile & Embedded Runtimes](#mobile--embedded-runtimes)
  - [Apple Silicon](#apple-silicon)
  - [PCs & NPUs](#pcs--npus)
  - [Browser & WebGPU](#browser--webgpu)
  - [Embedded Accelerators](#embedded-accelerators)
- [Verticals](#verticals) <sub>81</sub>
  - [Reasoning & Test-Time Compute](#reasoning--test-time-compute)
  - [Multimodal & Omni Models](#multimodal--omni-models)
  - [Image & Video Generation](#image--video-generation)
  - [Speech & Real-Time Audio](#speech--real-time-audio)
  - [Embeddings, Reranking & Retrieval](#embeddings-reranking--retrieval)
  - [Decision Models](#decision-models)
  - [Agents & Compound AI](#agents--compound-ai)
  - [RL Rollouts & Post-Training](#rl-rollouts--post-training)
  - [Robotics & Embodied AI](#robotics--embodied-ai)
  - [Diffusion Language Models](#diffusion-language-models)
  - [Classical ML & RecSys](#classical-ml--recsys)
- [Providers & Clouds](#providers--clouds) <sub>39</sub>
  - [Model APIs & Serverless Inference](#model-apis--serverless-inference)
  - [Serverless GPU Platforms](#serverless-gpu-platforms)
  - [GPU Clouds](#gpu-clouds)
  - [Hyperscaler AI Platforms](#hyperscaler-ai-platforms)
  - [Aggregators & Marketplaces](#aggregators--marketplaces)
  - [Decentralized Networks](#decentralized-networks)
- [Case Studies & Engineering Blogs](#case-studies--engineering-blogs) <sub>25</sub>
  - [Production Case Studies](#production-case-studies)
  - [Engineering Blogs](#engineering-blogs)
- [Learning Resources](#learning-resources) <sub>68</sub>
  - [Books](#books)
  - [Courses](#courses)
  - [Learning Paths](#learning-paths)
  - [Deep Dives & Essays](#deep-dives--essays)
  - [Talks & Videos](#talks--videos)
  - [Communities & Newsletters](#communities--newsletters)
  - [Conferences & Venues](#conferences--venues)

## Start Here

An ordered reading path that builds the mental model behind every other section: what happens to a request, where time and memory go, and why the hardware behaves the way it does.

1. **[Inference Engineering](https://www.baseten.co/inference-engineering/)** 📖 — Free book by Philip Kiely that frames inference engineering as a discipline, from hardware and runtimes to optimization and deployment.
2. **[How to Scale Your Model — Inference](https://jax-ml.github.io/scaling-book/inference/)** 📖 — Derives prefill and decode costs, batching limits, and KV cache memory from first principles, with worked latency estimates.
3. **[Transformer Inference Arithmetic](https://kipp.ly/p/transformer-inference-arithmetic)** — Back-of-the-envelope math for FLOPs, weight and KV bytes, and communication during transformer inference.
4. **[LLM Inference Handbook](https://handbook.modular.com/)** 📖 — Practitioner handbook on inference metrics, optimization techniques, and deployment patterns, originally published by BentoML.
5. **[Making Deep Learning Go Brrrr From First Principles](https://horace.io/brrr_intro.html)** — Explains why a workload is bound by compute, memory bandwidth, or overhead, and what to do about each case.
6. **[GPU Glossary](https://modal.com/gpu-glossary)** — Hyperlinked reference that explains GPU hardware and CUDA software terms from streaming multiprocessors to PTX.
7. **[Inside vLLM: Anatomy of a High-Throughput LLM Inference System](https://www.aleksagordic.com/blog/vllm)** — Walks through a modern engine end to end, from the scheduler and paged KV cache to prefix caching, speculative decoding, and disaggregation.
8. **[Efficiently Scaling Transformer Inference](https://arxiv.org/abs/2211.05102)** 📄 — Analytical model of latency, memory, and partitioning trade-offs for serving very large transformers. <sub>MLSys 2023</sub>
9. **[Defeating Nondeterminism in LLM Inference](https://thinkingmachines.ai/blog/defeating-nondeterminism-in-llm-inference/)** — Shows that batch-dependent reduction order, not concurrency, makes outputs vary, and builds batch-invariant kernels to fix it.
10. **[AI Systems Performance Engineering](https://github.com/cfregly/ai-performance-engineering)** 📖 — Code and labs for Chris Fregly's O'Reilly book on profiling-driven GPU, distributed training, and inference tuning. <sub>Apache-2.0 · ★ 2.1k · updated 2026-10</sub>

## Inference Engines

The runtimes that actually execute models: batching requests, managing the KV cache, and launching kernels.

### Datacenter Engines

- **[vLLM](https://github.com/vllm-project/vllm)** ⭐ — High-throughput serving engine built on paged KV cache management, continuous batching, and a broad hardware plugin ecosystem. <sub>Apache-2.0 · ★ 96k · updated 2026-10</sub>
- **[SGLang](https://github.com/sgl-project/sglang)** ⭐ — Serving engine with RadixAttention prefix reuse, fast constrained decoding, and large-scale expert-parallel deployments. <sub>Apache-2.0 · ★ 38k · updated 2026-10</sub>
- **[TensorRT-LLM](https://github.com/NVIDIA/TensorRT-LLM)** — NVIDIA's engine with a PyTorch-based runtime, in-flight batching, and kernels tuned for Hopper and Blackwell GPUs. <sub>Apache-2.0 · ★ 15k · updated 2026-10</sub>
- **[LMDeploy](https://github.com/InternLM/lmdeploy)** — Toolkit pairing the C++ TurboMind engine with a PyTorch engine, with weight and KV-cache quantization and Ascend support. <sub>Apache-2.0 · ★ 8.1k · updated 2026-10</sub>
- **[Modular MAX](https://github.com/modular/modular)** — Graph compiler, Mojo kernel library, and OpenAI-compatible serving stack that targets NVIDIA and AMD GPUs from one codebase. <sub>Apache-2.0 WITH LLVM-exception AND LicenseRef-MAX · ★ 30k · updated 2026-10</sub>
- **[DeepInfer](https://github.com/deepseek-ai/DeepInfer)** — DeepSeek's production engine, released for offline inference with expert parallelism, batch invariance, and Blackwell and Ascend support. <sub>Apache-2.0 · ★ 23k · updated 2026-10</sub>
- **[TokenSpeed](https://github.com/lightseekorg/tokenspeed)** — Engine for agentic workloads that splits a C++ state-machine control plane from a Python execution plane, with pluggable kernels. <sub>MIT · ★ 2.8k · updated 2026-10</sub>
- **[LightLLM](https://github.com/ModelTC/LightLLM)** — Pure-Python serving framework with token-level KV cache management, often used as the base for serving research prototypes. <sub>Apache-2.0 · ★ 4.3k · updated 2026-10</sub>
- **[RTP-LLM](https://github.com/alibaba/rtp-llm)** — Alibaba's in-house engine behind Taobao and other services, with a C++ scheduler and prefill-decode separation. <sub>Apache-2.0 · ★ 1.4k · updated 2026-10</sub>
- **[xLLM](https://github.com/xLLM-AI/xllm)** — Engine built at JD.com for Chinese accelerators such as Ascend, Cambricon, and Hygon, with a service layer decoupled from compute. <sub>Apache-2.0 · ★ 1.6k · updated 2026-10</sub>
- **[FastDeploy](https://github.com/PaddlePaddle/FastDeploy)** — PaddlePaddle-based LLM and VLM deployment toolkit from Baidu, with prefill-decode disaggregation and many Chinese accelerator backends. <sub>Apache-2.0 · ★ 3.7k · updated 2026-09</sub>
- **[Chitu](https://github.com/thu-pacman/chitu)** — Engine from Tsinghua's PACMAN group for NVIDIA and Chinese accelerators that scales from CPU+GPU hybrid boxes to clusters. <sub>Apache-2.0 · ★ 3k · updated 2026-10</sub>
- **[ATOM](https://github.com/ROCm/ATOM)** — AMD's lightweight vLLM-style engine built on AITER kernels for Instinct GPUs, also usable as a vLLM plugin. <sub>MIT · ★ 201 · updated 2026-10</sub>

### Local & Desktop Runtimes

- **[llama.cpp](https://github.com/ggml-org/llama.cpp)** ⭐ — Dependency-free C/C++ inference with GGUF quantization, running on CPUs, GPUs, and Apple silicon. <sub>MIT · ★ 133k · updated 2026-10</sub>
- **[Ollama](https://github.com/ollama/ollama)** ⭐ — Go tool that pulls, manages, and serves local models through a CLI and REST API, with ggml- and MLX-based backends. <sub>MIT · ★ 185k · updated 2026-10</sub>
- **[MLX LM](https://github.com/ml-explore/mlx-lm)** ⭐ — Python package for running, quantizing, and fine-tuning LLMs on Apple silicon with MLX, including a local OpenAI-style server. <sub>MIT · ★ 7.5k · updated 2026-10</sub>
- **[LM Studio](https://lmstudio.ai)** — Closed-source desktop app and local API server for Mac, Windows, and Linux that runs models on llama.cpp and MLX engines. <sub>proprietary · ★ 5.4k · updated 2026-10</sub>
- **[vLLM Metal](https://github.com/vllm-project/vllm-metal)** — Hardware plugin that runs vLLM on Apple silicon Macs, using MLX for compute and a paged varlen Metal attention kernel. <sub>Apache-2.0 · ★ 1.9k · updated 2026-10</sub>
- **[exo](https://github.com/exo-explore/exo)** — Pools Macs and other devices into one inference cluster with automatic discovery, tensor parallelism, and RDMA over Thunderbolt. <sub>Apache-2.0 · ★ 48k · updated 2026-10</sub>
- **[Jan](https://github.com/janhq/jan)** — Open-source desktop chat app with a bundled llama.cpp engine that runs models offline and exposes a local OpenAI-compatible server. <sub>Apache-2.0 · ★ 45k · updated 2026-10</sub>
- **[LocalAI](https://github.com/mudler/LocalAI)** — Self-hosted OpenAI-compatible API server that routes text, image, audio, and embedding requests to pluggable CPU or GPU backends. <sub>MIT · ★ 50k · updated 2026-10</sub>
- **[llamafile](https://github.com/mozilla-ai/llamafile)** — Packs model weights and a llama.cpp server into one executable that runs across operating systems and CPUs via Cosmopolitan Libc. <sub>Apache-2.0 · ★ 26k · updated 2026-10</sub>
- **[Docker Model Runner](https://github.com/docker/model-runner)** — Pulls models as OCI artifacts and serves them through llama.cpp, vLLM, or SGLang, inside Docker or as a standalone binary. <sub>Apache-2.0 · ★ 658 · updated 2026-10</sub>
- **[RamaLama](https://github.com/containers/ramalama)** — Runs and serves models inside rootless containers, picking a GPU-specific image for the host and treating models like images. <sub>MIT · ★ 3.1k · updated 2026-10</sub>
- **[ExLlamaV3](https://github.com/turboderp-org/exllamav3)** — Inference library for consumer NVIDIA GPUs built around the QTIP-based EXL3 format, with tensor parallelism and TabbyAPI as its server. <sub>MIT · ★ 1.8k · updated 2026-10</sub>
- **[KoboldCpp](https://github.com/LostRuins/koboldcpp)** — Single-executable llama.cpp distribution with a bundled web UI and compatible APIs, plus image, speech, and music generation. <sub>AGPL-3.0 · ★ 12k · updated 2026-10</sub>
- **[TextGen (text-generation-webui)](https://github.com/oobabooga/textgen)** — Desktop app and API for local models that switches between llama.cpp, ExLlamaV3, and Transformers backends, with portable builds. <sub>AGPL-3.0 · ★ 48k · updated 2026-08</sub>
- **[Foundry Local](https://github.com/microsoft/foundry-local)** — Microsoft's on-device runtime and SDKs that pick NPU, GPU, or CPU execution through ONNX Runtime for apps that embed local models. <sub>MIT AND LicenseRef-Proprietary · ★ 2.6k · updated 2026-10</sub>
- **[Lemonade](https://github.com/lemonade-sdk/lemonade)** — Local server with OpenAI-, Anthropic-, and Ollama-compatible APIs, tuned by AMD engineers for Ryzen AI NPUs and Radeon GPUs. <sub>Apache-2.0 · ★ 6k · updated 2026-10</sub>

### Hybrid CPU–GPU & Offloading

- **[KTransformers](https://github.com/kvcache-ai/ktransformers)** ⭐ — CPU–GPU heterogeneous runtime that keeps MoE experts on AMX/AVX-512 CPU kernels and plugs into SGLang; also supports MoE fine-tuning. <sub>Apache-2.0 · ★ 20k · updated 2026-10</sub>
- **[ik_llama.cpp](https://github.com/ikawrakow/ik_llama.cpp)** — Fork of llama.cpp with extra quantization types and faster CPU and hybrid CPU/GPU paths, widely used to run large MoE models at home. <sub>MIT · ★ 3.3k · updated 2026-10</sub>
- **[FastLLM](https://github.com/ztxz16/fastllm)** — C++ engine without a PyTorch dependency that splits dense and MoE models across GPUs, CPU NUMA nodes, and disk. <sub>Apache-2.0 · ★ 5.1k · updated 2026-10</sub>
- **[AirLLM](https://github.com/lyogavin/airllm)** — Streams weights layer by layer, or expert by expert for MoE, so very large models run on GPUs with only a few gigabytes of memory. <sub>Apache-2.0 · ★ 41k · updated 2026-10</sub>
- **[PowerInfer](https://github.com/Tiiny-AI/PowerInfer)** ⚠️ — Exploits activation sparsity by keeping frequently firing neurons on the GPU and computing the rest on the CPU, from the SOSP 2024 paper. <sub>MIT · ★ 9.8k · updated 2026-05</sub>
- **[FlexGen: High-Throughput Generative Inference of Large Language Models with a Single GPU](https://arxiv.org/abs/2303.06865)** 📄 — Offloading scheduler that searches placements of weights, activations, and KV cache across GPU, CPU, and disk for batch throughput. <sub>ICML 2023 · [code](https://github.com/FMInference/FlexLLMGen)</sub>

### Language-Native Runtimes

Engines written in Rust, C++, Zig, Mojo, and other systems languages.

- **[mistral.rs](https://github.com/EricLBuehler/mistral.rs)** ⭐ — Rust engine with paged attention, in-situ quantization, multimodal models, and OpenAI- and Anthropic-compatible servers on CUDA and Metal. <sub>MIT · ★ 7.8k · updated 2026-10</sub>
- **[Candle](https://github.com/huggingface/candle)** — Hugging Face's minimalist Rust ML framework with CPU, CUDA, Metal, and WebAssembly backends and many ready-made model ports. <sub>Apache-2.0 · ★ 21k · updated 2026-10</sub>
- **[Burn](https://github.com/tracel-ai/burn)** — Rust deep learning framework that JIT-compiles tensor op streams with automatic fusion across CUDA, ROCm, Metal, Vulkan, and WebGPU. <sub>Apache-2.0 · ★ 16k · updated 2026-10</sub>
- **[ZML](https://github.com/zml/zml)** — Zig inference stack that compiles models through MLIR and OpenXLA for NVIDIA, AMD, Intel, TPU, and Trainium from one codebase. <sub>Apache-2.0 · ★ 4.2k · updated 2026-10</sub>
- **[gemma.cpp](https://github.com/google/gemma.cpp)** — Google's compact C++ CPU engine for Gemma models, built on Highway portable SIMD and aimed at research and experimentation. <sub>Apache-2.0 · ★ 7.1k · updated 2026-10</sub>
- **[llama3.java](https://github.com/mukel/llama3.java)** — Single-file, dependency-free Java inference for Llama-family GGUF models, also used to test JVM and GraalVM compiler optimizations. <sub>MIT · ★ 817 · updated 2026-04</sub>

### Minimal & Educational Engines

Small, readable implementations for learning how production engines work.

- **[Nano-vLLM](https://github.com/GeeeekExplorer/nano-vllm)** ⭐ — Readable re-implementation of a vLLM-style engine in about a thousand lines of Python, with prefix caching and CUDA graphs. <sub>MIT · ★ 16k · updated 2026-04</sub>
- **[Mini-SGLang](https://github.com/sgl-project/mini-sglang)** — Compact, type-annotated rewrite of SGLang in about 5,000 lines of Python, with radix cache, chunked prefill, and overlap scheduling. <sub>MIT · ★ 5.5k · updated 2026-05</sub>
- **[tiny-vllm](https://github.com/jmaczan/tiny-vllm)** — Course plus C++/CUDA codebase that builds a small vLLM-style server step by step, from safetensors loading to paged attention. <sub>Apache-2.0 · ★ 1.2k · updated 2026-10</sub>
- **[tiny-llm](https://github.com/skyzh/tiny-llm)** 🎓 — Course that builds a Qwen serving stack on MLX from array ops up, adding KV cache, batching, and hand-written Metal kernels. <sub>Apache-2.0 · ★ 4.8k · updated 2026-10</sub>
- **[gpt-fast](https://github.com/meta-pytorch/gpt-fast)** ⚠️ — Under 1,000 lines of PyTorch showing how torch.compile, int8/int4 weight quantization, and speculative decoding speed up generation. <sub>BSD-3-Clause · ★ 6.3k · updated 2025-08</sub>

## Distributed Serving & Orchestration

Everything above a single engine instance: multi-node and disaggregated serving, Kubernetes integration, autoscaling, and getting weights onto GPUs quickly.

### Distributed & Disaggregated Serving

- **[NVIDIA Dynamo](https://github.com/ai-dynamo/dynamo)** ⭐ — Datacenter-scale serving layer over vLLM, SGLang, and TensorRT-LLM with prefill/decode disaggregation, KV-aware routing, and tiered KV cache. <sub>Apache-2.0 · ★ 8.4k · updated 2026-10</sub>
- **[llm-d](https://github.com/llm-d/llm-d)** ⭐ — Kubernetes-native distributed inference stack for vLLM and SGLang with prefix-cache-aware routing, prefill/decode disaggregation, and wide expert parallelism. <sub>Apache-2.0 · ★ 5.1k · updated 2026-10</sub>
- **[AIBrix](https://github.com/vllm-project/aibrix)** — Kubernetes control plane that routes on live engine state and adds LoRA packing, metric-driven autoscaling, and distributed KV cache for vLLM and SGLang. <sub>Apache-2.0 · ★ 5.2k · updated 2026-10</sub>
- **[vLLM Production Stack](https://github.com/vllm-project/production-stack)** — Helm-based reference deployment for vLLM clusters with a session-aware router, LMCache KV offloading, and Grafana dashboards. <sub>Apache-2.0 · ★ 2.7k · updated 2026-10</sub>
- **[Ray Serve LLM](https://docs.ray.io/en/latest/serve/llm/index.html)** — LLM layer of Ray Serve for multi-node, multi-model deployments over vLLM or SGLang, with prefill/decode disaggregation and prefix-aware routing. <sub>Apache-2.0 · ★ 44k · updated 2026-10</sub>
- **[Llumnix](https://github.com/llumnix-project/llumnix)** — Cluster scheduler for vLLM and SGLang instances that live-migrates requests between engines, with KV-aware, SLO-driven, and adaptive disaggregation policies. <sub>OSDI 2024 · Apache-2.0 · ★ 39 · updated 2026-05</sub>
- **[xLLM Service](https://github.com/xLLM-AI/xllm-service)** — Cluster service layer for JD's xLLM engine that co-schedules online and offline traffic and shifts instances between prefill and decode roles at runtime. <sub>Apache-2.0 · ★ 100 · updated 2026-10</sub>

### Kubernetes-Native Inference

- **[KServe](https://github.com/kserve/kserve)** ⭐ — CNCF platform for generative and predictive model serving on Kubernetes, with vLLM and llm-d backends, model caching, and autoscaling. <sub>Apache-2.0 · ★ 6.2k · updated 2026-10</sub>
- **[Gateway API Inference Extension](https://github.com/kubernetes-sigs/gateway-api-inference-extension)** — Kubernetes Gateway API extension that defines InferencePool, letting any ext-proc-capable gateway route to model servers through an endpoint picker. <sub>Apache-2.0 · ★ 798 · updated 2026-10</sub>
- **[LeaderWorkerSet](https://github.com/kubernetes-sigs/lws)** — Kubernetes API that deploys a leader pod and its workers as one replica for multi-host inference, plus DisaggregatedSet for prefill/decode roles. <sub>Apache-2.0 · ★ 895 · updated 2026-10</sub>
- **[KAITO](https://github.com/kaito-project/kaito)** — Operator that provisions GPU nodes and deploys vLLM-served models from a Hugging Face ID, with preset parallelism settings and KEDA-based scaling. <sub>Apache-2.0 · ★ 1k · updated 2026-10</sub>
- **[Grove](https://github.com/ai-dynamo/grove)** — Kubernetes API for multi-component inference workloads with hierarchical gang scheduling, topology-aware placement, and per-role scaling. <sub>Apache-2.0 · ★ 281 · updated 2026-10</sub>
- **[OME](https://github.com/ome-projects/ome)** — Operator that treats models as resources, matches each to a runtime config, and deploys SGLang or vLLM in multi-node or prefill/decode layouts. <sub>Apache-2.0 · ★ 521 · updated 2026-10</sub>
- **[RoleBasedGroup (RBG)](https://github.com/sgl-project/rbg)** — Kubernetes workload API that groups router, prefill, and decode roles into one unit with coordinated scaling, rollouts, and service discovery. <sub>Apache-2.0 · ★ 312 · updated 2026-10</sub>
- **[Kthena](https://github.com/volcano-sh/kthena)** — Volcano subproject with CRDs for model lifecycle and a model-aware router, covering prefill/decode disaggregation and topology-aware gang scheduling. <sub>Apache-2.0 · ★ 488 · updated 2026-10</sub>
- **[KubeAI](https://github.com/kubeai-project/kubeai)** — Lightweight operator that runs vLLM, Ollama, FasterWhisper, and Infinity servers with scale from zero, prefix-hash load balancing, and model caching. <sub>Apache-2.0 · ★ 1.3k · updated 2026-10</sub>
- **[KubeRay](https://github.com/kuberay-project/kuberay)** — Kubernetes operator for Ray clusters whose RayService resource runs Ray Serve applications with zero-downtime upgrades. <sub>Apache-2.0 · ★ 2.7k · updated 2026-10</sub>
- **[Kubernetes AI Conformance](https://github.com/cncf/k8s-ai-conformance)** — CNCF certification program listing the accelerator, scheduling, networking, and observability capabilities a Kubernetes platform needs for AI workloads. <sub>Apache-2.0 · ★ 311 · updated 2026-10</sub>
- **[Dynamic Resource Allocation](https://kubernetes.io/docs/concepts/resource-management/dynamic-resource-allocation/)** — Kubernetes docs for requesting GPUs and other devices through claims and device classes, beyond the count-based device-plugin model.

### Serving Frameworks & Platforms

- **[Ray Serve](https://docs.ray.io/en/latest/serve/index.html)** ⭐ — Python serving library on Ray for composing multi-model pipelines, with per-deployment autoscaling, request batching, and fractional GPUs. <sub>Apache-2.0 · ★ 44k · updated 2026-10</sub>
- **[Dynamo-Triton (Triton Inference Server)](https://github.com/triton-inference-server/server)** — Multi-framework model server with dynamic batching, model ensembles, and TensorRT, PyTorch, ONNX, OpenVINO, and Python backends. <sub>BSD-3-Clause · ★ 11k · updated 2026-10</sub>
- **[BentoML](https://github.com/bentoml/BentoML)** — Python framework for turning models into versioned API services, with adaptive batching, task queues, multi-model pipelines, and container builds. <sub>Apache-2.0 · ★ 8.9k · updated 2026-10</sub>
- **[GPUStack](https://github.com/gpustack/gpustack)** — GPU cluster manager that schedules vLLM, SGLang, or TensorRT-LLM deployments across on-prem, Kubernetes, and cloud GPUs behind a model-as-a-service UI. <sub>Apache-2.0 · ★ 5.9k · updated 2026-10</sub>
- **[Xinference](https://github.com/xorbitsai/inference)** — Self-hosted platform serving LLM, embedding, image, and speech models behind an OpenAI-compatible API, with vLLM, SGLang, and llama.cpp backends. <sub>Apache-2.0 · ★ 9.6k · updated 2026-10</sub>
- **[LitServe](https://github.com/Lightning-AI/LitServe)** — Minimal FastAPI-based framework for writing custom inference servers in Python, with batching, streaming, and multi-worker GPU scaling. <sub>Apache-2.0 · ★ 4k · updated 2026-10</sub>
- **[Truss](https://github.com/basetenlabs/truss)** — CLI and packaging convention for Python model servers that deploy to Baseten or your own containers, with presets for vLLM, SGLang, and TensorRT-LLM. <sub>MIT · ★ 1.2k · updated 2026-10</sub>
- **[Cog](https://github.com/replicate/cog)** — Packages a model and its CUDA and Python environment into a standard container with a typed HTTP prediction API, as used by Replicate. <sub>Apache-2.0 · ★ 9.5k · updated 2026-10</sub>
- **[OpenVINO Model Server](https://github.com/openvinotoolkit/model_server)** — C++ model server for OpenVINO with OpenAI-compatible endpoints for LLMs and KServe APIs for classic models, on Intel CPUs, GPUs, and NPUs. <sub>Apache-2.0 · ★ 952 · updated 2026-10</sub>

### Autoscaling, Scheduling & Multi-Cloud

- **[SkyPilot](https://github.com/skypilot-org/skypilot)** ⭐ — Runs and scales AI jobs and inference endpoints across clouds, Kubernetes, and on-prem clusters, placing work wherever GPUs are available and cheaper. <sub>Apache-2.0 · ★ 11k · updated 2026-10</sub>
- **[KAI Scheduler](https://github.com/kai-scheduler/KAI-Scheduler)** — Kubernetes scheduler for large GPU clusters with fair-share queues, gang and topology-aware scheduling, and GPU sharing between workloads. <sub>Apache-2.0 · ★ 1.6k · updated 2026-10</sub>
- **[NVIDIA Run:ai](https://github.com/dsx-ai-factory/run-ai)** — GPU orchestration platform for Kubernetes with quota-based fair sharing, fractional GPUs, and a multi-cluster control plane for training and inference. <sub>Apache-2.0 · ★ 667 · updated 2026-10</sub>
- **[dstack](https://github.com/dstackai/dstack)** — Orchestration layer for GPU clouds, Kubernetes, and bare metal that provisions fleets and runs autoscaled inference services alongside training. <sub>MPL-2.0 · ★ 2.3k · updated 2026-10</sub>
- **[KEDA](https://github.com/kedacore/keda)** — Event-driven Kubernetes autoscaler that llm-d, KAITO, and OME use to scale model servers on Prometheus signals such as queue depth or KV-cache use. <sub>Apache-2.0 · ★ 11k · updated 2026-10</sub>
- **[llm-d Autoscaling](https://github.com/llm-d/llm-d-autoscaling)** — Reviewed KEDA scaling blueprints for prefill and decode roles, plus a test bed for tuning triggers on queue depth and KV-cache utilization. <sub>Apache-2.0 · ★ 61 · updated 2026-10</sub>
- **[HAMi](https://github.com/Project-HAMi/HAMi)** — CNCF project for sharing and isolating GPUs and NPUs across Kubernetes pods by memory and compute slices, with device-aware scheduling. <sub>Apache-2.0 · ★ 5k · updated 2026-10</sub>

### Model Packaging, Loading & Cold Starts

- **[safetensors](https://github.com/safetensors/safetensors)** ⭐ — Pickle-free tensor file format with zero-copy, lazy loading, and the Rust library behind it; the standard checkpoint format for Hugging Face models. <sub>Apache-2.0 · ★ 3.9k · updated 2026-10</sub>
- **[GGUF](https://github.com/ggml-org/ggml/blob/master/docs/gguf.md)** ⭐ — Single-file binary format for ggml models that stores quantized tensors with tokenizer and architecture metadata; used by llama.cpp and Ollama. <sub>MIT · ★ 16k · updated 2026-10</sub>
- **[ONNX](https://github.com/onnx/onnx)** — Open graph format and operator set for moving models from training frameworks to runtimes such as ONNX Runtime, TensorRT, and OpenVINO. <sub>Apache-2.0 · ★ 22k · updated 2026-10</sub>
- **[Model Streamer](https://github.com/dsx-ai-factory/model-streamer)** — Streams safetensors tensors from local disk or object storage into GPU memory with concurrent reads; vLLM exposes it as a load format. <sub>Apache-2.0 · ★ 400 · updated 2026-10</sub>
- **[ModelExpress](https://github.com/ai-dynamo/modelexpress)** — Finds the quickest source of model weights, including GPU-to-GPU copies from running replicas over NIXL, and shares JIT kernel caches between replicas. <sub>Apache-2.0 · ★ 195 · updated 2026-10</sub>
- **[fastsafetensors](https://github.com/foundation-model-stack/fastsafetensors)** — Safetensors loader that reads files in parallel, optionally via GPUDirect Storage, and shards tensors across GPUs; a load format in vLLM and SGLang. <sub>Apache-2.0 · ★ 180 · updated 2026-10</sub>
- **[ServerlessLLM](https://github.com/ServerlessLLM/ServerlessLLM)** — Multi-model serving system with a loading-optimized checkpoint format, GPU multiplexing, and locality-aware scheduling to cut cold starts. <sub>OSDI 2024 · Apache-2.0 · ★ 717 · updated 2026-09</sub>
- **[Tensorizer](https://github.com/coreweave/tensorizer)** — Serializes PyTorch modules for streaming loads from HTTP, S3, or local disk straight into GPU memory, with optional tensor encryption. <sub>MIT · ★ 327 · updated 2026-07</sub>
- **[cuda-checkpoint](https://github.com/NVIDIA/cuda-checkpoint)** — Command-line utility that suspends and restores CUDA state in a running process; paired with CRIU it snapshots GPU processes for faster restarts. <sub>proprietary · ★ 504 · updated 2026-07</sub>
- **[vLLM Sleep Mode](https://docs.vllm.ai/en/latest/features/sleep_mode/)** — Frees GPU memory on an idle vLLM engine by offloading or discarding weights and the KV cache, then wakes it without restarting the server process.
- **[ModelPack](https://github.com/modelpack/model-spec)** — CNCF specification for packaging model weights, configs, and metadata as OCI artifacts so registries and Kubernetes can distribute them. <sub>Apache-2.0 · ★ 237 · updated 2026-10</sub>
- **[KitOps](https://github.com/kitops-ml/kitops)** — CLI that packages models, datasets, code, and configs into versioned OCI artifacts (ModelKits) stored in existing container registries. <sub>Apache-2.0 · ★ 1.4k · updated 2026-10</sub>
- **[Xet (xet-core)](https://github.com/huggingface/xet-core)** — Client for Hugging Face's Xet storage backend that deduplicates model files in chunks to speed uploads and downloads from the Hub. <sub>Apache-2.0 · ★ 619 · updated 2026-10</sub>

## Gateways & Routing

The layer in front of the engines: unified APIs, traffic management, model selection, and the protocols that clients speak.

### AI Gateways

- **[LiteLLM](https://github.com/BerriAI/litellm)** ⭐ — Python SDK and proxy that translate many provider APIs into the OpenAI format, with virtual keys, budgets, load balancing, and request logging. <sub>★ 62k · updated 2026-10</sub>
- **[Agent Router](https://github.com/theagentrouter/agent-router)** — Envoy Gateway-based control plane that puts one OpenAI-compatible API over hosted models, self-hosted inference, and MCP servers; formerly Envoy AI Gateway. <sub>Apache-2.0 · ★ 2.3k · updated 2026-10</sub>
- **[Bifrost](https://github.com/maximhq/bifrost)** — Go gateway with one OpenAI-compatible API over many providers, adding failover, semantic caching, virtual keys with budgets, and MCP tool access. <sub>Apache-2.0 · ★ 9.1k · updated 2026-10</sub>
- **[Kong AI Gateway](https://developer.konghq.com/ai-gateway/)** — AI plugins for the Kong API gateway that proxy and normalize LLM provider APIs, with prompt guards, templates, and request and response transforms. <sub>Apache-2.0 · ★ 44k · updated 2026-10</sub>
- **[Higress](https://github.com/higress-group/higress)** — Envoy and Istio-based API gateway, originally from Alibaba, with Wasm plugins for LLM proxying, token rate limits, AI caching, and MCP server hosting. <sub>Apache-2.0 · ★ 9.6k · updated 2026-10</sub>
- **[Plano](https://github.com/katanemo/plano)** — Envoy-based data plane for agent apps that adds preference-aligned model routing, agent orchestration, guardrail filter chains, and tracing; formerly archgw. <sub>Apache-2.0 · ★ 7.1k · updated 2026-10</sub>
- **[Portkey AI Gateway](https://github.com/Portkey-AI/gateway)** ⚠️ — TypeScript gateway that routes to many LLM providers with retries, fallbacks, load balancing, and pluggable guardrails, runnable on edge or Node. <sub>MIT · ★ 13k · updated 2026-05</sub>

### Agent & MCP Gateways

- **[agentgateway](https://github.com/agentgateway/agentgateway)** ⭐ — Rust proxy for agent traffic that speaks MCP and A2A as well as LLM APIs, adding authentication, policy, and observability across tools and agents. <sub>Apache-2.0 · ★ 5.7k · updated 2026-10</sub>
- **[ContextForge](https://github.com/IBM/mcp-context-forge)** — Registry and proxy that federates MCP servers, A2A agents, and REST or gRPC APIs behind one endpoint, with auth, rate limits, and OpenTelemetry tracing. <sub>Apache-2.0 · ★ 4.7k · updated 2026-10</sub>
- **[MCP Gateway (Microsoft)](https://github.com/microsoft/mcp-gateway)** — Reverse proxy and management layer for MCP servers on Kubernetes that handles request routing, authorization, and server deployment lifecycle. <sub>MIT · ★ 898 · updated 2026-10</sub>
- **[Docker MCP Gateway](https://github.com/docker/mcp-gateway)** — Docker CLI plugin that runs each MCP server in an isolated container and exposes them to clients through a single gateway with managed secrets. <sub>MIT · ★ 1.6k · updated 2026-10</sub>

### Model Routing & Cascades

- **[vLLM Semantic Router](https://github.com/vllm-project/semantic-router)** ⭐ — Policy-driven decision layer that classifies each request and selects or combines models across local and cloud backends by quality, latency, and cost. <sub>Apache-2.0 · ★ 6.3k · updated 2026-10</sub>
- **[llm-d Router](https://github.com/llm-d/llm-d-router)** — Endpoint picker for Gateway API inference pools that scores replicas by prefix-cache locality, load, and priority; formerly the llm-d inference scheduler. <sub>Apache-2.0 · ★ 432 · updated 2026-10</sub>
- **[vLLM Router](https://github.com/vllm-project/router)** — Rust request router for large vLLM fleets with cache-aware and consistent-hash load balancing, prefill/decode routing, and Kubernetes discovery. <sub>Apache-2.0 · ★ 483 · updated 2026-10</sub>
- **[SGLang Model Gateway](https://docs.sglang.io/docs/advanced_features/sgl_model_gateway)** — Rust gateway for SGLang worker fleets with cache-aware load balancing, prefill/decode routing, gRPC mode with gateway-side tokenization, and MCP tools. <sub>Apache-2.0 · ★ 38k · updated 2026-10</sub>
- **[NeMo Switchyard](https://github.com/NVIDIA-NeMo/Switchyard)** — Rust routing library, embeddable in gateways or agent harnesses, that picks a model per request or agent step to balance task success against cost. <sub>Apache-2.0 · ★ 3.5k · updated 2026-10</sub>
- **[LLMRouter](https://github.com/ulab-uiuc/LLMRouter)** — Research library that implements and benchmarks learned model-routing methods, from single-turn classifiers to multi-turn, multimodal, and agentic routers. <sub>MIT · ★ 3k · updated 2026-10</sub>

### API Specs & Protocols

- **[OpenAI API OpenAPI Spec](https://github.com/openai/openai-openapi)** ⭐ — Machine-readable OpenAPI description of the OpenAI API, the de facto contract that most engines and gateways implement. <sub>MIT · ★ 2.6k · updated 2026-10</sub>
- **[Model Context Protocol Specification](https://github.com/modelcontextprotocol/modelcontextprotocol)** — JSON-RPC protocol and schema for connecting models and agents to external tools, resources, and prompts, published as dated versions. <sub>★ 9.5k · updated 2026-10</sub>
- **[Open Inference Protocol](https://github.com/kserve/open-inference-protocol)** — REST and gRPC inference protocol, also called KServe v2, implemented by KServe, Triton, MLServer, and OpenVINO Model Server. <sub>Apache-2.0 · ★ 79 · updated 2025-05</sub>
- **[Open Responses](https://github.com/openresponses/openresponses)** — Provider-neutral spec derived from the OpenAI Responses API that defines items, semantic streaming events, and tool-call loops, with acceptance tests. <sub>Apache-2.0 · ★ 1.2k · updated 2026-10</sub>
- **[OpenAI Harmony](https://github.com/openai/harmony)** — Prompt and response format used by gpt-oss, with separate analysis, commentary, and final channels, plus Rust and Python renderers. <sub>Apache-2.0 · ★ 4.5k · updated 2026-04</sub>
- **[Agent2Agent (A2A) Protocol](https://github.com/a2aproject/A2A)** — Linux Foundation protocol for agents to discover each other through agent cards and exchange tasks and messages over HTTP. <sub>Apache-2.0 · ★ 26k · updated 2026-10</sub>

## Model Compression

Making models smaller and cheaper to run: quantization toolkits, low-precision number formats, pruning, sparsity, and distillation.

### Quantization Toolkits

- **[LLM Compressor](https://github.com/vllm-project/llm-compressor)** ⭐ — Applies GPTQ, AWQ, SmoothQuant, and FP8 or NVFP4 recipes to Hugging Face models and saves compressed-tensors checkpoints that vLLM loads directly. <sub>Apache-2.0 · ★ 3.9k · updated 2026-10</sub>
- **[NVIDIA Model Optimizer](https://github.com/NVIDIA/Model-Optimizer)** — Formerly TensorRT Model Optimizer; FP8, NVFP4, and INT4 quantization plus pruning and distillation, exporting checkpoints to TensorRT-LLM, vLLM, and SGLang. <sub>Apache-2.0 · ★ 5.5k · updated 2026-10</sub>
- **[bitsandbytes](https://github.com/bitsandbytes-foundation/bitsandbytes)** — Reference code for LLM.int8() outlier-aware 8-bit matmul and the NF4 4-bit format from QLoRA, applied at load time in Transformers without calibration. <sub>MIT · ★ 8.5k · updated 2026-10</sub>
- **[GPTQModel](https://github.com/ModelCloud/GPTQModel)** — Toolkit centered on GPTQ that also produces AWQ, GGUF, FP8, and EXL3 checkpoints, with kernels for NVIDIA, AMD, Intel, Ascend, and Apple hardware. <sub>Apache-2.0 · ★ 1.3k · updated 2026-10</sub>
- **[AutoRound](https://github.com/intel/auto-round)** — Intel's sign-gradient rounding method for low-bit post-training quantization, exporting GPTQ and AWQ layouts, GGUF, MXFP4, and NVFP4 checkpoints. <sub>Apache-2.0 · ★ 1.7k · updated 2026-10</sub>
- **[AMD Quark](https://github.com/amd/Quark)** — AMD's quantization and pruning toolkit for PyTorch and ONNX models, with OCP FP8 and MX data types and FP8 KV-cache quantization. <sub>MIT · ★ 186 · updated 2026-09</sub>
- **[TorchAO](https://github.com/pytorch/ao)** ⚠️ — PyTorch-native int4, int8, float8, and MX quantization and QAT used by Transformers and Diffusers; new feature work is moving into PyTorch core. <sub>BSD-3-Clause · ★ 3k · updated 2026-10</sub>
- **[HQQ](https://github.com/dropbox/hqq)** ⚠️ — Calibration-free half-quadratic weight quantization from 8 down to 1 bit, with a linear dequantization step that works with torch.compile and fused kernels. <sub>Apache-2.0 · ★ 960 · updated 2026-02</sub>
- **[GPTQ](https://arxiv.org/abs/2210.17323)** 📄 — One-shot 3- and 4-bit weight quantization that uses approximate second-order information to correct error layer by layer, with no retraining. <sub>ICLR 2023 · [code](https://github.com/IST-DASLab/gptq)</sub>
- **[SmoothQuant](https://arxiv.org/abs/2211.10438)** 📄 — Moves activation outliers into the weights with a per-channel scale so both can be quantized to INT8 (W8A8) without retraining. <sub>ICML 2023 · [code](https://github.com/mit-han-lab/smoothquant)</sub>
- **[AWQ](https://arxiv.org/abs/2306.00978)** 📄 — Rescales the weight channels that matter most, chosen from activation magnitudes, before 4-bit weight-only quantization; MLSys 2024 Best Paper. <sub>MLSys 2024 · [code](https://github.com/mit-han-lab/llm-awq)</sub>
- **[QuaRot](https://arxiv.org/abs/2404.00456)** 📄 — Hadamard rotations that remove outliers without changing model outputs, so weights, activations, and KV cache can all run in 4 bits. <sub>NeurIPS 2024 · [code](https://github.com/spcl/QuaRot)</sub>
- **[SpinQuant](https://arxiv.org/abs/2405.16406)** 📄 — Learns the rotation matrices applied before quantization instead of fixing them, improving W4A4KV4 accuracy over random Hadamard rotations. <sub>ICLR 2025 · [code](https://github.com/facebookresearch/SpinQuant)</sub>
- **[QServe](https://arxiv.org/abs/2405.04532)** 📄 — W4A8KV4 quantization co-designed with GPU kernels so that 4-bit weights and KV cache speed up large-batch serving, not only single-user decode. <sub>MLSys 2025 · [code](https://github.com/mit-han-lab/omniserve)</sub>

### Number Formats & Specs

- **[OCP MicroXcaling (MX) Specification](https://www.opencompute.org/wp-content/uploads/2026/10/OCP_MicroXcaling_Spec_v1.1.0-1.pdf)** ⭐ — Block formats in which 32 FP8, FP6, FP4, or INT8 elements share one power-of-two UE8M0 scale, defining MXFP8, MXFP6, MXFP4, and MXINT8.
- **[OCP 8-bit Floating Point Specification (OFP8)](https://www.opencompute.org/documents/ocp-8-bit-floating-point-specification-ofp8-revision-1-1-final-pdf)** — Cross-vendor standard for the E4M3 and E5M2 FP8 encodings, covering special values, saturation, and conversion rules; revision 1.1 took effect in 2026.
- **[Introducing NVFP4 for Efficient and Accurate Low-Precision Inference](https://developer.nvidia.com/blog/introducing-nvfp4-for-efficient-and-accurate-low-precision-inference/)** — Defines NVFP4, Blackwell's E2M1 format with an FP8 E4M3 scale per 16 values plus a per-tensor FP32 scale, and contrasts it with MXFP4.
- **[FP8 Formats for Deep Learning](https://arxiv.org/abs/2209.05433)** 📄 — Joint NVIDIA, Arm, and Intel proposal of the E4M3 and E5M2 encodings later standardized by OCP, with training and inference accuracy results. <sub>arXiv 2022</sub>
- **[GGUF Quantization Types](https://huggingface.co/docs/hub/gguf#quantization-types)** — Reference table of llama.cpp block formats, from legacy Q4_0 to k-quants, i-quants, ternary TQ, and MXFP4, with block layout and bits per weight.
- **[BitNet b1.58 and bitnet.cpp](https://github.com/microsoft/BitNet)** — Ternary (1.58-bit) weights trained from scratch, with bitnet.cpp lookup-table kernels for running such models on CPUs and GPUs. <sub>MIT · ★ 41k · updated 2026-07</sub>

### Pruning, Sparsity & Distillation

- **[SparseGPT](https://arxiv.org/abs/2301.00774)** ⭐ 📄 — One-shot pruning of GPT-scale models to 50% unstructured or 2:4 sparsity by solving a layer-wise reconstruction problem, without retraining. <sub>ICML 2023 · [code](https://github.com/IST-DASLab/sparsegpt)</sub>
- **[Wanda](https://arxiv.org/abs/2306.11695)** 📄 — Prunes by weight magnitude times input activation norm, with no weight updates or second-order solves, for both unstructured and N:M sparsity. <sub>ICLR 2024 · [code](https://github.com/locuslab/wanda)</sub>
- **[Minitron](https://arxiv.org/abs/2407.14679)** 📄 — NVIDIA recipe that prunes depth, width, attention heads, and MLP channels, then recovers accuracy with distillation; now part of Model Optimizer. <sub>NeurIPS 2024 · [code](https://github.com/NVlabs/Minitron)</sub>
- **[Accelerating Sparse Deep Neural Networks (2:4 sparsity)](https://arxiv.org/abs/2104.08378)** 📄 — NVIDIA's account of 2:4 structured sparsity on Sparse Tensor Cores and the prune-then-retrain workflow that keeps dense accuracy. <sub>arXiv 2021 · [code](https://github.com/NVIDIA/apex/tree/master/apex/contrib/sparsity)</sub>
- **[Deja Vu](https://arxiv.org/abs/2310.17157)** 📄 — Predicts which attention heads and MLP neurons each input needs and skips the rest at decode time, the contextual-sparsity idea behind later engines. <sub>ICML 2023 · [code](https://github.com/FMInference/DejaVu)</sub>
- **[Distilling the Knowledge in a Neural Network](https://arxiv.org/abs/1503.02531)** 📄 — Introduced training a small student on a large teacher's temperature-softened output distribution, the basis of most model distillation. <sub>NIPS Deep Learning Workshop 2014</sub>

## Decoding Acceleration

Techniques that produce more useful tokens per forward pass: speculative decoding, the tooling to train drafters, and fast constrained decoding.

### Speculative Decoding

- **[Fast Inference from Transformers via Speculative Decoding](https://arxiv.org/abs/2211.17192)** ⭐ 📄 — Introduced draft-then-verify decoding with an acceptance rule that leaves the target model's output distribution unchanged. <sub>ICML 2023</sub>
- **[EAGLE-3](https://arxiv.org/abs/2503.01840)** ⭐ 📄 — Predicts tokens instead of features and fuses low-, mid-, and high-layer target features via training-time test, so drafters keep improving with more data. <sub>NeurIPS 2025 · [code](https://github.com/SafeAILab/EAGLE)</sub>
- **[Accelerating Large Language Model Decoding with Speculative Sampling](https://arxiv.org/abs/2302.01318)** 📄 — Concurrent DeepMind derivation of draft-and-verify decoding with a modified rejection sampler, evaluated on Chinchilla 70B. <sub>arXiv 2023</sub>
- **[SpecInfer](https://arxiv.org/abs/2305.09781)** 📄 — Organizes draft candidates into a token tree and verifies all branches in one pass with tree attention, the basis of tree-based speculation. <sub>ASPLOS 2024 · [code](https://github.com/flexflow/flexflow-serve)</sub>
- **[Medusa](https://arxiv.org/abs/2401.10774)** 📄 — Adds extra decoding heads to the target model that propose several future tokens, checked together with tree attention, with no separate drafter. <sub>ICML 2024 · [code](https://github.com/FasterDecoding/Medusa)</sub>
- **[EAGLE](https://arxiv.org/abs/2401.15077)** 📄 — Drafts at the feature level, with a light head that extrapolates the target's second-to-top-layer hidden states given the sampled token. <sub>ICML 2024 · [code](https://github.com/SafeAILab/EAGLE)</sub>
- **[Better & Faster Large Language Models via Multi-token Prediction](https://arxiv.org/abs/2404.19737)** 📄 — Trains several output heads on a shared trunk to predict future tokens at once; the extra heads double as self-speculative drafters. <sub>ICML 2024</sub>
- **[SuffixDecoding](https://arxiv.org/abs/2411.04975)** 📄 — Model-free drafting from suffix trees over prompts and earlier outputs, aimed at repetitive agent workloads; vLLM's suffix method calls this code. <sub>NeurIPS 2025 · [code](https://github.com/snowflakedb/ArcticInference)</sub>
- **[P-EAGLE](https://arxiv.org/abs/2602.01469)** 📄 — Turns EAGLE into a parallel drafter that proposes several tokens per forward pass, with a training scheme that scales to long reasoning sequences. <sub>NeurIPS 2026</sub>
- **[DFlash](https://arxiv.org/abs/2602.06036)** 📄 — Uses a small block-diffusion model, conditioned on target-model features, to draft a whole block of tokens in one pass; DFlash 2 followed. <sub>ICML 2026 · [code](https://github.com/z-lab/dflash)</sub>
- **[Spec-Bench](https://github.com/hemingkx/Spec-Bench)** ⚠️ — Shared harness that compares speculative decoding methods on the same model and GPU across chat, translation, summarization, QA, math, and RAG. <sub>Apache-2.0 · ★ 415 · updated 2025-04</sub>

### Drafter Training

- **[SpecForge](https://github.com/sgl-project/SpecForge)** ⭐ — SGLang team's framework for training EAGLE-3, P-EAGLE, and DFlash drafters online or offline, producing checkpoints that SGLang serves directly. <sub>MIT · ★ 1.2k · updated 2026-10</sub>
- **[Speculators](https://github.com/vllm-project/speculators)** — Generates target hidden states with vLLM, trains EAGLE-3, P-EAGLE, DFlash, and DSpark drafters, and stores them in a format vLLM loads as-is. <sub>Apache-2.0 · ★ 925 · updated 2026-10</sub>
- **[TorchSpec](https://github.com/lightseekorg/TorchSpec)** — Disaggregated drafter training that streams target hidden states from inference engines to trainers through Mooncake instead of writing them to disk. <sub>MIT · ★ 265 · updated 2026-10</sub>
- **[EAGLE (official code)](https://github.com/SafeAILab/EAGLE)** — Authors' training and inference code with released draft weights for EAGLE-1, EAGLE-2 dynamic draft trees, and EAGLE-3. <sub>Apache-2.0 · ★ 2.6k · updated 2026-02</sub>

### Structured Outputs & Constrained Decoding

- **[XGrammar](https://github.com/mlc-ai/xgrammar)** ⭐ — Grammar engine that prechecks context-independent tokens to build masks cheaply; XGrammar-2 adds tag-triggered structures for tool calls. <sub>Apache-2.0 · ★ 2k · updated 2026-10</sub>
- **[llguidance](https://github.com/guidance-ai/llguidance)** — Rust engine pairing a regex-derivative lexer with an Earley parser to compute token masks per step; a backend in vLLM, SGLang, and llama.cpp. <sub>MIT · ★ 901 · updated 2026-10</sub>
- **[Outlines](https://github.com/dottxt-ai/outlines)** — Python library that constrains generation to JSON Schema, regex, or grammars across local models and hosted APIs. <sub>Apache-2.0 · ★ 16k · updated 2026-09</sub>
- **[Efficient Guided Generation for Large Language Models](https://arxiv.org/abs/2307.09702)** 📄 — Compiles regexes and grammars into finite-state machines and precomputes an index over the vocabulary so each masking step is cheap. <sub>arXiv 2023 · [code](https://github.com/dottxt-ai/outlines-core)</sub>
- **[Guidance](https://github.com/guidance-ai/guidance)** — Python programming model that interleaves prompts, generation, and grammar constraints in one program, with llguidance as its engine. <sub>MIT · ★ 22k · updated 2026-05</sub>
- **[LM Format Enforcer](https://github.com/noamgat/lm-format-enforcer)** — Enforces JSON Schema or regex output by walking a character-level parser alongside the tokenizer prefix tree; also a vLLM backend. <sub>MIT · ★ 2k · updated 2026-04</sub>
- **[JSONSchemaBench](https://github.com/guidance-ai/jsonschemabench)** — Real-world JSON Schemas for comparing constrained-decoding engines on coverage, speed, and output quality, plus MaskBench for mask latency. <sub>★ 102 · updated 2026-09</sub>

## KV Cache & Attention

The KV cache is the central memory object of LLM serving. This section covers storing, moving, compressing, and reusing it, plus attention variants designed to shrink it.

### KV Cache Management & Offloading

- **[PagedAttention](https://arxiv.org/abs/2309.06180)** ⭐ 📄 — Stores the KV cache in fixed-size blocks mapped through a block table, nearly removing fragmentation and allowing copy-on-write sharing between sequences. <sub>SOSP 2023 · [code](https://github.com/vllm-project/vllm)</sub>
- **[LMCache](https://github.com/LMCache/LMCache)** ⭐ — KV cache layer that stores, moves, and reuses KV data across GPU, CPU, disk, and remote tiers, attached to vLLM and SGLang through connectors. <sub>Apache-2.0 · ★ 12k · updated 2026-10</sub>
- **[Mooncake](https://github.com/kvcache-ai/Mooncake)** — Moonshot AI's KV-centric infrastructure, an RDMA transfer engine plus a distributed KV store, used as a backend by vLLM, SGLang, and TensorRT-LLM. <sub>Apache-2.0 · ★ 6.9k · updated 2026-10</sub>
- **[LMCache: An Efficient KV Cache Layer for Enterprise-Scale LLM Inference](https://arxiv.org/abs/2510.09665)** 📄 — Design paper behind LMCache, covering the engine connector interface, batched KV movement between tiers, and support for both prefix reuse and P/D transfer. <sub>2025 · [code](https://github.com/LMCache/LMCache)</sub>
- **[vLLM KV Offloading Connector](https://docs.vllm.ai/en/latest/features/kv_offloading_usage/)** — Configures vLLM's built-in connector that copies finished KV blocks to pinned CPU memory and optional secondary tiers with asynchronous DMA.
- **[SGLang HiCache](https://docs.sglang.io/docs/advanced_features/hicache_design)** — Design of SGLang's hierarchical cache, which extends the radix-tree prefix cache from GPU memory to host memory and storage backends like Mooncake and 3FS.
- **[kvcached](https://github.com/ovg-project/kvcached)** — Elastic KV cache allocator built on GPU virtual memory, so several vLLM or SGLang models can share one GPU and resize their caches with load. <sub>Apache-2.0 · ★ 2k · updated 2026-10</sub>
- **[FlexKV](https://github.com/taco-project/FlexKV)** — Tencent Cloud's tiered KV cache manager for CPU, SSD, and remote storage, integrated with vLLM, SGLang, TensorRT-LLM, and Dynamo. <sub>★ 380 · updated 2026-10</sub>

### KV Compression & Eviction

- **[KVPress](https://github.com/NVIDIA/kvpress)** ⭐ — Library of pluggable KV cache pruning methods, called presses, for Hugging Face transformers, with benchmarks to compare them on long-context tasks. <sub>Apache-2.0 · ★ 1.2k · updated 2026-10</sub>
- **[KIVI](https://arxiv.org/abs/2402.02750)** 📄 — Tuning-free 2-bit KV quantization that quantizes keys per channel and values per token, keeping a small full-precision window of recent tokens. <sub>ICML 2024 · [code](https://github.com/jy-yuan/KIVI)</sub>
- **[StreamingLLM (Attention Sinks)](https://arxiv.org/abs/2309.17453)** 📄 — Shows that the first tokens act as attention sinks; keeping them plus a sliding window lets models stream past their training length without retraining. <sub>ICLR 2024 · [code](https://github.com/mit-han-lab/streaming-llm)</sub>
- **[H2O (Heavy-Hitter Oracle)](https://arxiv.org/abs/2306.14048)** 📄 — Evicts KV entries except recent tokens and heavy hitters, the tokens with the largest accumulated attention scores, to cap cache size during generation. <sub>NeurIPS 2023 · [code](https://github.com/FMInference/H2O)</sub>
- **[SnapKV](https://arxiv.org/abs/2404.14469)** 📄 — Chooses which prompt positions each attention head keeps by looking at attention from a window at the end of the prompt, compressing the cache before decoding. <sub>NeurIPS 2024 · [code](https://github.com/FasterDecoding/SnapKV)</sub>
- **[KVQuant](https://arxiv.org/abs/2401.18079)** 📄 — Sub-4-bit KV quantization using per-channel keys taken before RoPE, non-uniform datatypes, and a sparse side matrix for outliers. <sub>NeurIPS 2024 · [code](https://github.com/SqueezeAILab/KVQuant)</sub>
- **[TurboQuant](https://arxiv.org/abs/2504.19874)** 📄 — Data-oblivious online vector quantizer, a random rotation plus scalar quantizers and a 1-bit residual sketch, applied to low-bit KV caches. <sub>ICLR 2026</sub>
- **[CacheGen](https://arxiv.org/abs/2310.07240)** 📄 — Encodes KV caches into compact bitstreams and adapts their quality to available bandwidth, cutting the time to load long contexts over the network. <sub>SIGCOMM 2024 · [code](https://github.com/UChi-JCL/CacheGen)</sub>
- **[vLLM Quantized KV Cache](https://docs.vllm.ai/en/latest/features/quantization/quantized_kvcache/)** — Explains FP8 KV cache in vLLM, including per-tensor and per-head scales and how to calibrate them with llm-compressor.

### Prefix & Prompt Caching

- **[SGLang: Efficient Execution of Structured Language Model Programs](https://arxiv.org/abs/2312.07104)** ⭐ 📄 — Introduces RadixAttention, which keeps KV caches in a radix tree for automatic prefix reuse across requests, with LRU eviction and cache-aware scheduling. <sub>NeurIPS 2024 · [code](https://github.com/sgl-project/sglang)</sub>
- **[vLLM Automatic Prefix Caching](https://docs.vllm.ai/en/latest/design/prefix_caching/)** — Design notes on vLLM's hash-based prefix cache, where each block's key chains its own tokens with its prefix and free blocks are evicted in LRU order.
- **[CacheBlend](https://arxiv.org/abs/2405.16444)** 📄 — Reuses precomputed KV caches for non-prefix chunks such as RAG documents, recomputing a small set of tokens to restore cross-chunk attention. <sub>EuroSys 2025 · [code](https://github.com/YaoJiayi/CacheBlend)</sub>
- **[Prompt Cache](https://arxiv.org/abs/2311.04934)** 📄 — Precomputes attention states for prompt modules declared in a schema and reuses them across prompts, even when the modules are not a shared prefix. <sub>MLSys 2024 · [code](https://github.com/yale-sys/prompt-cache)</sub>
- **[Marconi](https://arxiv.org/abs/2411.19379)** 📄 — Prefix caching for hybrid attention and state-space models, with admission and eviction policies that weigh recurrent-state reuse against memory cost. <sub>MLSys 2025 · [code](https://github.com/ruipeterpan/marconi)</sub>

### Sparse, Linear & Hybrid Attention

- **[Grouped-Query Attention (GQA)](https://arxiv.org/abs/2305.13245)** ⭐ 📄 — Lets groups of query heads share key-value heads, sitting between multi-head and multi-query attention, and uptrains existing checkpoints to use it. <sub>EMNLP 2023</sub>
- **[DeepSeek-V2 (Multi-head Latent Attention)](https://arxiv.org/abs/2405.04434)** ⭐ 📄 — Introduced multi-head latent attention, which caches one compressed latent vector per token instead of separate keys and values for every head. <sub>2024</sub>
- **[flash-linear-attention](https://github.com/fla-org/flash-linear-attention)** — Triton kernels and layers for linear attention, state-space, and sparse attention variants such as Gated DeltaNet, KDA, and Mamba2. <sub>MIT · ★ 6k · updated 2026-10</sub>
- **[Multi-Query Attention (MQA)](https://arxiv.org/abs/1911.02150)** 📄 — Shares a single key and value head across all query heads, shrinking the KV cache and the memory traffic of incremental decoding. <sub>2019</sub>
- **[Native Sparse Attention (NSA)](https://arxiv.org/abs/2502.11089)** 📄 — Trainable sparse attention with compressed, selected, and sliding-window branches whose block layout is designed for efficient GPU kernels. <sub>ACL 2025</sub>
- **[DeepSeek-V3.2 (DeepSeek Sparse Attention)](https://arxiv.org/abs/2512.02556)** 📄 — Adds DeepSeek Sparse Attention on top of MLA, where a cheap indexer ranks past tokens and attention runs only over the selected subset. <sub>2025</sub>
- **[DeepSeek-V4 (Compressed Sparse Attention)](https://arxiv.org/abs/2606.19348)** 📄 — Preview report on interleaving Compressed Sparse Attention and Heavily Compressed Attention layers to make million-token contexts affordable to serve. <sub>2026</sub>
- **[Gated DeltaNet](https://arxiv.org/abs/2412.06464)** 📄 — Linear-attention layer combining Mamba2-style gating with the delta rule, used for the linear layers of hybrid models from Qwen3-Next onward. <sub>ICLR 2025 · [code](https://github.com/NVlabs/GatedDeltaNet)</sub>
- **[Kimi Linear](https://arxiv.org/abs/2510.26692)** 📄 — Hybrid architecture that interleaves Kimi Delta Attention, a gated linear attention, with MLA layers to cut KV cache size for long contexts. <sub>2025 · [code](https://github.com/MoonshotAI/Kimi-Linear)</sub>
- **[Jenga](https://arxiv.org/abs/2503.18292)** 📄 — Two-level allocator, built on vLLM, that sizes pages by the LCM of layer embedding sizes and lets each layer type set its own caching and eviction. <sub>SOSP 2025</sub>

## Scheduling & Parallelism

How requests are batched and scheduled, and how models are split across GPUs and nodes.

### Batching & Scheduling

- **[Orca](https://www.usenix.org/conference/osdi22/presentation/yu)** ⭐ 📄 — Schedules one model iteration at a time, so finished requests leave and new ones join the batch every step; the origin of continuous batching. <sub>OSDI 2022</sub>
- **[Sarathi-Serve](https://arxiv.org/abs/2403.02310)** ⭐ 📄 — Splits prompts into chunks and mixes them with ongoing decodes under a fixed token budget, so admitting new requests does not stall running ones. <sub>OSDI 2024 · [code](https://github.com/microsoft/sarathi-serve)</sub>
- **[Fairness in Serving Large Language Models (VTC)](https://arxiv.org/abs/2401.00588)** 📄 — Defines fairness over weighted input and output token counts and enforces it with a work-conserving Virtual Token Counter scheduler. <sub>OSDI 2024 · [code](https://github.com/Ying1123/VTC-artifact)</sub>
- **[DeepSpeed-FastGen](https://arxiv.org/abs/2401.08671)** 📄 — Introduced Dynamic SplitFuse, which builds each forward pass from prompt chunks and decode tokens to keep the batch at a steady token count. <sub>2024 · [code](https://github.com/deepspeedai/DeepSpeed-MII)</sub>
- **[NanoFlow](https://arxiv.org/abs/2408.12757)** 📄 — Splits batches into nano-batches and overlaps compute-, memory-, and network-bound operations inside one GPU to raise serving throughput. <sub>OSDI 2025 · [code](https://github.com/efeslab/Nanoflow)</sub>
- **[vLLM Optimization and Tuning](https://docs.vllm.ai/en/latest/configuration/optimization/)** — Covers vLLM preemption, chunked-prefill token budgets, and parallelism choices that trade throughput against latency.

### Prefill–Decode Disaggregation

- **[DistServe](https://arxiv.org/abs/2401.09670)** ⭐ 📄 — Removes prefill-decode interference by giving each phase its own GPUs, then tunes resources and parallelism per phase against TTFT and TPOT targets. <sub>OSDI 2024 · [code](https://github.com/LLMServe/DistServe)</sub>
- **[Splitwise](https://arxiv.org/abs/2311.18677)** 📄 — Runs prompt and token-generation phases on separate machine pools, possibly of different GPU generations, and ships KV state between them. <sub>ISCA 2024</sub>
- **[NIXL](https://github.com/ai-dynamo/nixl)** — Transfer library with one API over GPU, CPU, file, and object memory, used by engines to move KV blocks through UCX, libfabric, GDS, and other plugins. <sub>Apache-2.0 · ★ 1.3k · updated 2026-10</sub>
- **[Mooncake: A KVCache-centric Disaggregated Architecture for LLM Serving](https://arxiv.org/abs/2407.00079)** 📄 — Kimi's serving design, with separate prefill and decode clusters around a KV pool in spare CPU memory and SSD, plus prediction-based rejection under overload. <sub>FAST 2025 · [code](https://github.com/kvcache-ai/Mooncake)</sub>
- **[vLLM Disaggregated Prefilling](https://docs.vllm.ai/en/latest/features/disagg_prefill/)** — Experimental vLLM mode that runs prefill and decode in separate instances linked by KV connectors such as NIXL, LMCache, and Mooncake.
- **[SGLang PD Disaggregation](https://docs.sglang.io/docs/advanced_features/pd_disaggregation)** — Guide to running SGLang prefill and decode servers separately, with Mooncake, NIXL, or Ascend transfer backends and a router in front.

### Parallelism & MoE Serving

- **[DeepSeek-V3 Technical Report](https://arxiv.org/abs/2412.19437)** ⭐ 📄 — Covers MLA, auxiliary-loss-free expert balancing, and multi-token prediction, plus prefill and decode deployment with expert parallelism and redundant experts. <sub>2024 · [code](https://github.com/deepseek-ai/DeepSeek-V3)</sub>
- **[Megatron-LM](https://arxiv.org/abs/1909.08053)** 📄 — Splits attention heads and MLP weights across GPUs so each transformer layer needs only two all-reduces; the tensor parallelism engines still use. <sub>2019 · [code](https://github.com/NVIDIA/Megatron-LM)</sub>
- **[llm-d Wide Expert Parallelism Guide](https://llm-d.ai/docs/well-lit-paths/foundations/wide-expert-parallelism)** — Deploys a large MoE across nodes with DP/EP, prefill/decode disaggregation, and a router that targets individual data-parallel ranks.
- **[GShard](https://arxiv.org/abs/2006.16668)** 📄 — Scaled sparsely gated MoE transformers across thousands of TPU cores using top-2 routing, expert capacity limits, and XLA sharding annotations. <sub>ICLR 2021</sub>
- **[MegaScale-Infer](https://arxiv.org/abs/2504.02263)** 📄 — Puts attention and expert layers on separate GPU pools and pipelines micro-batches between them over a custom M2N communication library. <sub>SIGCOMM 2025</sub>
- **[Step-3 (Attention-FFN Disaggregation)](https://arxiv.org/abs/2507.19427)** 📄 — Model-system co-design report pairing a factorized attention design with attention-FFN disaggregation to lower decoding cost. <sub>2025 · [code](https://github.com/stepfun-ai/Step3)</sub>
- **[vLLM AFD Plugin](https://github.com/vllm-project/afd-plugin)** 🧪 — External vLLM plugin that runs attention and FFN of DeepSeek-family MoE models as separately scaled services on NVIDIA GPUs and Ascend NPUs. <sub>Apache-2.0 · ★ 242 · updated 2026-10</sub>
- **[EPLB](https://github.com/deepseek-ai/EPLB)** ⚠️ — DeepSeek's reference algorithm for replicating heavily loaded experts and packing replicas across GPUs and nodes, with hierarchical and global policies. <sub>MIT · ★ 1.5k · updated 2025-03</sub>
- **[vLLM Expert Parallel Deployment](https://docs.vllm.ai/en/latest/serving/expert_parallel_deployment/)** — How to serve MoE models in vLLM with expert parallelism over data-parallel attention, including DeepEP backends and EPLB settings.
- **[vLLM Parallelism and Scaling](https://docs.vllm.ai/en/latest/serving/parallelism_scaling/)** — Decision guide for tensor, pipeline, and data parallelism in vLLM on one node or many, including Ray-based multi-node setup.

### Long-Context Inference

- **[Ring Attention](https://arxiv.org/abs/2310.01889)** ⭐ 📄 — Splits a long sequence across devices, each computing blockwise attention while passing key-value blocks to its neighbor and hiding the transfer behind compute. <sub>ICLR 2024 · [code](https://github.com/haoliuhl/ringattention)</sub>
- **[vLLM Context Parallel Deployment](https://docs.vllm.ai/en/latest/serving/context_parallel_deployment/)** — How vLLM spreads long-context prefill and decode across GPUs, covering partial-query and partial-KV strategies and decode context parallelism.
- **[Context Parallelism for Scalable Million-Token Inference](https://arxiv.org/abs/2411.01783)** 📄 — Meta's pass-KV and pass-Q ring-attention variants for inference, scaling long-context prefill across many nodes over RDMA or TCP. <sub>MLSys 2025</sub>
- **[MInference](https://github.com/microsoft/MInference)** ⚠️ — Speeds up long-context prefill by assigning each head a sparse attention pattern offline and building its index online; the kernels now live in vLLM and SGLang. <sub>MIT · ★ 1.2k · updated 2026-10</sub>
- **[Star Attention](https://arxiv.org/abs/2411.17116)** 📄 — Two-phase long-sequence inference where hosts encode context blocks with local attention, then query and output tokens attend globally across hosts. <sub>ICML 2025 · [code](https://github.com/NVIDIA/Star-Attention)</sub>

### Multi-LoRA & Multi-Tenant Serving

- **[S-LoRA](https://arxiv.org/abs/2311.03285)** ⭐ 📄 — Serves thousands of adapters by keeping them in host memory, paging active ones into a GPU pool shared with the KV cache, and batching them with custom kernels. <sub>MLSys 2024</sub>
- **[vLLM LoRA Adapters](https://docs.vllm.ai/en/latest/features/lora/)** — Per-request LoRA serving in vLLM, with multi-adapter batches, runtime loading through API endpoints, and resolver plugins.
- **[Punica](https://arxiv.org/abs/2310.18547)** 📄 — Introduced the SGMV kernel, which batches requests for different LoRA adapters of one base model into a single GPU pass. <sub>MLSys 2024</sub>
- **[SGLang LoRA Serving](https://docs.sglang.io/docs/advanced_features/lora)** — Covers multi-adapter batches, dynamic adapter loading, GPU pinning, and kernel backend choice for LoRA serving in SGLang.

## Kernels & GPU Programming

The GPU code underneath the engines.

### Kernel Libraries

- **[FlashAttention](https://github.com/Dao-AILab/flash-attention)** ⭐ — IO-aware exact attention kernels; FA3 targets Hopper and FA4, written in CuTe DSL, targets Blackwell. <sub>BSD-3-Clause · ★ 25k · updated 2026-10</sub>
- **[FlashInfer](https://github.com/flashinfer-ai/flashinfer)** ⭐ — Attention, sampling, MoE, and GEMM kernels built for LLM serving, with JIT-compiled variants used as backends by vLLM and SGLang. <sub>Apache-2.0 · ★ 6.8k · updated 2026-10</sub>
- **[CUTLASS](https://github.com/NVIDIA/cutlass)** — NVIDIA's C++ templates and CuTe layout abstractions for GEMM-class kernels, plus the Python CuTe DSL, from Ampere through Blackwell. <sub>BSD-3-Clause · ★ 11k · updated 2026-10</sub>
- **[DeepGEMM](https://github.com/deepseek-ai/DeepGEMM)** — DeepSeek's JIT-compiled tensor-core kernels for FP8, FP4, and BF16 GEMMs, grouped MoE GEMMs, and MoE fused with communication. <sub>MIT · ★ 9.1k · updated 2026-10</sub>
- **[FlashMLA](https://github.com/deepseek-ai/FlashMLA)** — DeepSeek's sparse and dense MLA attention kernels with FP8 or FP4 KV cache, for Blackwell GPUs and Ascend NPUs (Hopper in older releases). <sub>MIT · ★ 13k · updated 2026-10</sub>
- **[Transformer Engine](https://github.com/NVIDIA/TransformerEngine)** — Transformer layers and scaling recipes for FP8, MXFP8, and NVFP4 execution on Hopper and Blackwell, with PyTorch and JAX bindings. <sub>Apache-2.0 · ★ 3.6k · updated 2026-10</sub>
- **[ThunderKittens](https://github.com/HazyResearch/ThunderKittens)** — Tile primitives embedded in CUDA C++ for writing attention and GEMM kernels; version 2.0 adds Blackwell, MXFP8, and NVFP4 support. <sub>MIT · ★ 3.8k · updated 2026-09</sub>
- **[QuACK](https://github.com/Dao-AILab/quack)** — Norm, softmax, cross-entropy, and GEMM-with-epilogue kernels written in CuTe DSL by the FlashAttention authors, for Hopper and Blackwell. <sub>Apache-2.0 · ★ 1.2k · updated 2026-10</sub>
- **[AITER](https://github.com/ROCm/aiter)** — AMD's operator library for inference and training on ROCm, combining Triton, Composable Kernel, and hand-written assembly backends. <sub>MIT · ★ 598 · updated 2026-10</sub>
- **[Composable Kernel](https://rocm.docs.amd.com/projects/composable_kernel/en/latest/)** — AMD's C++ templates for tiled GEMM, attention, and fused operators on Instinct GPUs; the source now lives in the rocm-libraries monorepo. <sub>★ 456 · updated 2026-10</sub>
- **[HipKittens](https://github.com/HazyResearch/HipKittens)** — ThunderKittens-style tile primitives for AMD CDNA 3 and CDNA 4 GPUs, also shipped as a kernel backend inside AITER. <sub>MIT · ★ 479 · updated 2026-10</sub>
- **[SageAttention](https://github.com/thu-ml/SageAttention)** — Quantized attention kernels (INT8 QK, FP8 PV, FP4 on Blackwell) that replace FlashAttention without retraining, common in video diffusion. <sub>Apache-2.0 · ★ 4k · updated 2026-01</sub>
- **[Kernels (Hugging Face)](https://github.com/huggingface/kernels)** — Loader and build tooling that fetches precompiled, version-pinned compute kernels from the Hugging Face Hub at runtime. <sub>Apache-2.0 · ★ 781 · updated 2026-10</sub>
- **[TileKernels](https://github.com/deepseek-ai/TileKernels)** — DeepSeek's TileLang kernels for MoE routing, FP8 and FP4 quantization, Engram gating, and hyper-connections on NVIDIA GPUs and Ascend NPUs. <sub>MIT · ★ 2k · updated 2026-10</sub>
- **[DeepSelect](https://github.com/deepseek-ai/DeepSelect)** — Top-k selection kernels for the lightning indexer in DeepSeek Sparse Attention and for token samplers, on CUDA and Ascend. <sub>MIT · ★ 521 · updated 2026-09</sub>
- **[Marlin](https://github.com/IST-DASLab/marlin)** ⚠️ — Reference FP16xINT4 mixed-precision GEMM kernel for small-batch decoding; maintained Marlin variants now ship inside vLLM. <sub>Apache-2.0 · ★ 1.2k · updated 2024-09</sub>

### Kernel Languages & DSLs

- **[Triton](https://github.com/triton-lang/triton)** ⭐ — Python-embedded language and compiler for writing tiled GPU kernels, with Gluon as a lower-level layer. <sub>MIT · ★ 20k · updated 2026-10</sub>
- **[CUDA Programming Guide](https://docs.nvidia.com/cuda/cuda-programming-guide/)** ⭐ — NVIDIA's normative reference for the CUDA execution model, memory hierarchy, C++ language extensions, and per-architecture features.
- **[PTX ISA](https://docs.nvidia.com/cuda/parallel-thread-execution/)** — Specification of NVIDIA's virtual instruction set and memory model, including async-copy, TMA, wgmma, and tcgen05 instructions.
- **[CUDA C++ Best Practices Guide](https://docs.nvidia.com/cuda/cuda-c-best-practices-guide/)** — Official optimization workflow for CUDA C++ covering memory coalescing, shared memory, occupancy, and the assess-parallelize-optimize cycle.
- **[CuTe DSL](https://docs.nvidia.com/cutlass/latest/media/docs/pythonDSL/overview.html)** — Python DSL exposing CUTLASS's CuTe layouts and tensor-core atoms with JIT compilation; FlashAttention-4 and QuACK are written in it. <sub>★ 11k · updated 2026-10</sub>
- **[Triton Tutorials](https://triton-lang.org/main/getting-started/tutorials/index.html)** — Official worked kernels from vector add through fused softmax, grouped matmul, fused attention, persistent and block-scaled matmul.
- **[Gluon](https://triton-lang.org/main/gluon/index.html)** — Lower-level Triton programming model that makes layouts, warp specialization, and target-specific features explicit to the kernel author.
- **[cuTile Python](https://github.com/NVIDIA/cutile-python)** — NVIDIA's tile-level Python kernel language, compiled through the MLIR-based CUDA Tile IR rather than written as per-thread SIMT code. <sub>Apache-2.0 · ★ 2.2k · updated 2026-10</sub>
- **[TileLang](https://github.com/tile-ai/tilelang)** — Python tile DSL built on TVM for writing GPU and accelerator kernels with explicit pipelining, used by DeepSeek's TileKernels. <sub>MIT · ★ 8.8k · updated 2026-10</sub>
- **[Helion](https://github.com/pytorch/helion)** — PyTorch-native kernel DSL that lowers tiled Python code to Triton and autotunes across many implementation choices. <sub>BSD-3-Clause · ★ 975 · updated 2026-10</sub>
- **[Pallas](https://docs.jax.dev/en/latest/pallas/index.html)** — JAX extension for writing custom kernels that lower through Mosaic on TPUs and through Triton or Mosaic GPU on NVIDIA GPUs. <sub>Apache-2.0 · ★ 37k · updated 2026-10</sub>
- **[NKI (Neuron Kernel Interface)](https://awsdocs-neuron.readthedocs-hosted.com/en/latest/nki/get-started/nki-language-guide.html)** — Tile-level Python kernel language for AWS Trainium and Inferentia NeuronCores with explicit control over on-chip memory and engines.
- **[Mojo GPU Programming](https://max.modular.com/gpu/fundamentals/)** — Guide to writing GPU kernels in Mojo, a Python-syntax systems language that targets NVIDIA, AMD, and Apple GPUs from one codebase. <sub>★ 30k · updated 2026-10</sub>

### Megakernels & Superoptimizers

- **[Mirage Persistent Kernel (MPK)](https://github.com/mirage-project/mirage)** ⭐ — Compiler and runtime that turns a multi-GPU LLM forward pass into one persistent megakernel with SM-level task scheduling. <sub>Apache-2.0 · ★ 2.6k · updated 2026-10</sub>
- **[Mirage: A Multi-Level Superoptimizer for Tensor Programs](https://arxiv.org/abs/2405.05751)** 📄 — Searches kernel, thread-block, and thread-level program transformations to discover fused GPU kernels that hand-written rules miss. <sub>OSDI 2025 · [code](https://github.com/mirage-project/mirage)</sub>
- **[Megakernels (Hazy Research)](https://github.com/HazyResearch/Megakernels)** 🧪 — ThunderKittens-based research megakernels that run a full Llama forward pass in a single launch to eliminate kernel-boundary stalls. <sub>MIT · ★ 871 · updated 2026-05</sub>
- **[TileRT](https://github.com/tile-ai/TileRT)** 🧪 — Tile-level runtime that splits LLM operators into fine-grained tasks and overlaps compute, I/O, and communication for low-latency decoding. <sub>MIT · ★ 1.9k · updated 2026-09</sub>

### Collective Communication

- **[NCCL](https://github.com/NVIDIA/nccl)** ⭐ — NVIDIA's collective and point-to-point communication library over NVLink, PCIe, InfiniBand, and RoCE; the default PyTorch GPU backend. <sub>Apache-2.0 AND BSD-3-Clause · ★ 5.2k · updated 2026-10</sub>
- **[NCCL Device API](https://docs.nvidia.com/deeplearning/nccl/user-guide/docs/usage/deviceapi.html)** — Docs for NCCL's device-side API, which lets kernels issue communication over NVLink load/store, multicast, and GPU-initiated RDMA.
- **[NVSHMEM](https://github.com/NVIDIA/nvshmem)** — OpenSHMEM-style global address space for NVIDIA GPUs with one-sided puts, gets, atomics, and signals issued from inside kernels. <sub>Apache-2.0 · ★ 596 · updated 2026-10</sub>
- **[DeepEP](https://github.com/deepseek-ai/DeepEP)** — Expert-parallel dispatch and combine kernels with high-throughput NVLink/RDMA modes for prefill and low-latency modes for decoding. <sub>MIT · ★ 10k · updated 2026-10</sub>
- **[RCCL](https://rocm.docs.amd.com/projects/rccl/en/latest/)** — AMD's NCCL-compatible collective library for Instinct GPUs over Infinity Fabric and RDMA; its source now lives in the rocm-systems monorepo. <sub>★ 543 · updated 2026-10</sub>
- **[UCCL](https://github.com/uccl-project/uccl)** — GPU communication library with an NCCL/RCCL-compatible collective layer, P2P transfers for KV cache and weights, and GPU-driven EP. <sub>Apache-2.0 · ★ 1.6k · updated 2026-10</sub>
- **[pplx-garden](https://github.com/perplexityai/pplx-garden)** — Perplexity's RDMA transfer engine and point-to-point MoE dispatch/combine kernels for ConnectX and AWS EFA; supersedes pplx-kernels. <sub>MIT · ★ 951 · updated 2026-09</sub>
- **[MoonEP](https://github.com/MoonshotAI/MoonEP)** — Expert-parallel communication library that equalizes per-rank token load by planning redundant experts online from router outputs. <sub>MIT · ★ 1.2k · updated 2026-10</sub>
- **[Triton-distributed](https://github.com/ByteDance-Seed/Triton-distributed)** — Triton extended with communication primitives for writing kernels that overlap computation with intra- and inter-node transfers. <sub>MIT · ★ 1.6k · updated 2026-09</sub>
- **[MSCCL++](https://github.com/microsoft/mscclpp)** — GPU-driven communication stack with one-sided put, get, and signal primitives over NVLink, xGMI, and InfiniBand for custom collectives. <sub>MIT · ★ 567 · updated 2026-10</sub>

### AI-Generated Kernels & Kernel Benchmarks

- **[KernelBench](https://github.com/ScalingIntelligence/KernelBench)** ⭐ — Stanford benchmark of PyTorch operators and models that LLMs must rewrite as correct, faster GPU kernels; introduced at ICML 2025. <sub>MIT · ★ 1.3k · updated 2026-03</sub>
- **[KernelBench-Verified](https://arxiv.org/abs/2607.16241)** 📄 — Shows how reward hacking inflates KernelBench speedups and adds TF32 baselines, hidden multi-distribution tests, and memory metrics. <sub>arXiv 2026</sub>
- **[FlashInfer-Bench](https://github.com/flashinfer-ai/flashinfer-bench)** — Kernel tasks and workloads captured from LLM serving, with tooling to swap verified AI-written kernels into SGLang and vLLM. <sub>Apache-2.0 · ★ 300 · updated 2026-09</sub>
- **[SOL-ExecBench](https://github.com/NVIDIA/SOL-ExecBench)** — Scores AI-written kernels in several DSLs against an analytical B200 speed-of-light bound, with correctness and reward-hack checks. <sub>Apache-2.0 · ★ 323 · updated 2026-07</sub>
- **[KernelGuard](https://icml.cc/virtual/2026/67922)** 📄 — Integrity layer of static rules, physics-floor timing checks, and an LLM judge that catches reward-hacked submissions in kernel competitions. <sub>ICML 2026</sub>
- **[TritonBench](https://github.com/meta-pytorch/tritonbench)** — Operator benchmark suite that times Triton kernels against PyTorch eager, vendor libraries, and other baselines on standard inputs. <sub>BSD-3-Clause · ★ 373 · updated 2026-10</sub>

## Compilers & Graph Runtimes

Whole-graph compilers and vendor runtimes that turn a model into an optimized executable.

### PyTorch Compilation Stack

- **[torch.compile](https://docs.pytorch.org/docs/stable/torch.compiler.html)** ⭐ — PyTorch's JIT compiler entry point, where TorchDynamo captures Python bytecode into FX graphs and TorchInductor emits Triton or C++.
- **[PyTorch 2: Dynamic Python Bytecode Transformation and Graph Compilation](https://dl.acm.org/doi/10.1145/3620665.3640366)** 📄 — Design paper for TorchDynamo and TorchInductor, covering guarded graph capture and the code generation behind torch.compile. <sub>ASPLOS 2024 · [code](https://github.com/pytorch/pytorch)</sub>
- **[torch.export](https://docs.pytorch.org/docs/stable/export.html)** — Ahead-of-time capture of a PyTorch program into one sound graph with symbolic shapes, the input format for AOTInductor and other backends.
- **[AOTInductor](https://docs.pytorch.org/docs/stable/torch.compiler_aot_inductor.html)** — Compiles exported PyTorch programs into a shared library and package that load and run from C++ or Python without recompiling.
- **[Torch-TensorRT](https://github.com/pytorch/TensorRT)** — Compiler backend that lowers torch.compile or torch.export graphs to TensorRT engines and falls back to PyTorch for unsupported ops. <sub>BSD-3-Clause · ★ 3k · updated 2026-10</sub>
- **[Lightning Thunder](https://github.com/Lightning-AI/lightning-thunder)** — Source-to-source PyTorch compiler that traces programs and hands regions to executors such as nvFuser, cuDNN, and torch.compile. <sub>Apache-2.0 · ★ 1.5k · updated 2026-10</sub>

### Vendor Runtimes

- **[TensorRT](https://docs.nvidia.com/deeplearning/tensorrt/latest/)** ⭐ — NVIDIA's inference optimizer and runtime; version 11 removed weakly typed networks, implicit quantization, and IPluginV2. <sub>proprietary · ★ 13k · updated 2026-10</sub>
- **[ONNX Runtime](https://github.com/microsoft/onnxruntime)** ⭐ — Cross-platform runtime for ONNX graphs that applies graph optimizations and dispatches to execution providers like CUDA, TensorRT, and QNN. <sub>MIT · ★ 22k · updated 2026-10</sub>
- **[TensorRT for RTX](https://docs.nvidia.com/deeplearning/tensorrt-rtx/latest/)** — Lightweight TensorRT variant for RTX PCs and workstations that finishes engine optimization just-in-time on the end user's GPU. <sub>proprietary · ★ 115 · updated 2026-10</sub>
- **[ONNX Runtime GenAI](https://github.com/microsoft/onnxruntime-genai)** — Generation loop on top of ONNX Runtime with KV cache handling, sampling, and a model builder that exports LLMs to optimized ONNX. <sub>MIT · ★ 1.1k · updated 2026-10</sub>
- **[OpenVINO](https://github.com/openvinotoolkit/openvino)** — Intel's toolkit for converting, optimizing, and running models on Intel CPUs, integrated and discrete GPUs, and NPUs. <sub>Apache-2.0 · ★ 11k · updated 2026-10</sub>
- **[OpenVINO GenAI](https://github.com/openvinotoolkit/openvino.genai)** — C++ and Python pipelines for LLMs, VLMs, Whisper, and image generation on OpenVINO, with continuous batching and speculative decoding. <sub>Apache-2.0 · ★ 604 · updated 2026-10</sub>
- **[MIGraphX](https://github.com/ROCm/AMDMIGraphX)** — AMD's graph compiler for ROCm that imports ONNX models, fuses operators, and tunes kernels for Instinct and Radeon GPUs. <sub>MIT · ★ 337 · updated 2026-10</sub>

### Open Compiler Stacks

- **[XLA](https://github.com/openxla/xla)** ⭐ — Compiler behind JAX and TensorFlow, also usable from PyTorch, that turns StableHLO graphs into fused code for TPUs, GPUs, and CPUs. <sub>Apache-2.0 · ★ 4.6k · updated 2026-10</sub>
- **[Apache TVM](https://github.com/apache/tvm)** — Python-first ML compilation framework with the Relax graph IR and a tensor-level IR, used underneath MLC LLM and WebLLM. <sub>Apache-2.0 · ★ 14k · updated 2026-10</sub>
- **[IREE](https://github.com/iree-org/iree)** — MLIR-based compiler and runtime that lowers models to one IR and deploys them from datacenter GPUs down to mobile and edge devices. <sub>Apache-2.0 · ★ 4k · updated 2026-10</sub>
- **[MLIR](https://mlir.llvm.org)** — LLVM subproject providing reusable IR dialects and pass infrastructure that many ML compilers, Triton and IREE included, are built on. <sub>Apache-2.0 WITH LLVM-exception · ★ 41k · updated 2026-10</sub>
- **[StableHLO](https://github.com/openxla/stablehlo)** — Versioned operation set that acts as the portability layer between JAX, PyTorch, and TensorFlow and compilers such as XLA and IREE. <sub>Apache-2.0 · ★ 713 · updated 2026-10</sub>
- **[Luminal](https://github.com/luminal-ai/luminal)** 🧪 — Rust inference compiler that reduces models to a small set of primitive ops and searches over rewrites to discover fused kernels. <sub>Apache-2.0 · ★ 3k · updated 2026-10</sub>

## Hardware & Accelerators

Architecture guides, whitepapers, and software stacks for the chips that run inference. Vendor peak numbers are not measurements; prefer the tuning guides and independent analysis.

### NVIDIA

- **[Hopper Tuning Guide](https://docs.nvidia.com/cuda/hopper-tuning-guide/)** ⭐ — NVIDIA's guide to Hopper-specific CUDA features, including TMA, thread block clusters, and FP8 tuning advice.
- **[Blackwell Architecture Technical Brief](https://resources.nvidia.com/en-us-blackwell-architecture/blackwell-architecture-technical-brief)** ⭐ — NVIDIA's technical overview of the Blackwell GPU, covering the dual-die design, fifth-generation NVLink, and the decompression engine.
- **[Blackwell Tuning Guide](https://docs.nvidia.com/cuda/blackwell-tuning-guide/)** — NVIDIA's guide to Blackwell-specific features, limits, and optimization advice for CUDA developers.
- **[CUTLASS Blackwell Documentation](https://docs.nvidia.com/cutlass/latest/media/docs/cpp/blackwell.html)** — CUTLASS reference for Blackwell SM100/SM120 GEMM layouts, tcgen05 MMA instructions, and warp-specialized kernel schedules.
- **[Multi-Node NVLink Systems Tuning Guide](https://docs.nvidia.com/multi-node-nvlink-systems/multi-node-tuning-guide/)** — NVIDIA's performance tuning guide for GB200 NVL multi-node racks, covering topology, collectives, and scaling LLM inference.
- **[DGX Spark User Guide](https://docs.nvidia.com/dgx/dgx-spark/)** — NVIDIA's documentation for the DGX Spark desktop system built on the GB10 Grace Blackwell Superchip.
- **[Inside NVIDIA Rubin GPU Architecture](https://developer.nvidia.com/blog/inside-nvidia-rubin-gpu-architecture-powering-the-era-of-agentic-ai/)** — NVIDIA developer blog on the pre-release Rubin GPU's dual-die design, HBM4, NVLink 6, and MoE-oriented tensor core features.

### AMD

- **[AMD CDNA 4 Architecture Whitepaper](https://www.amd.com/content/dam/amd/en/documents/instinct-tech-docs/white-papers/amd-cdna-4-architecture-whitepaper.pdf)** ⭐ — AMD's whitepaper on the CDNA 4 architecture behind the Instinct MI350 series, covering compute units, precision formats, and memory.
- **[AMD CDNA 4 Instruction Set Architecture](https://www.amd.com/content/dam/amd/en/documents/instinct-tech-docs/instruction-set-architectures/amd-instinct-cdna4-instruction-set-architecture.pdf)** — Reference manual for the CDNA 4 instruction set, documenting registers, the memory model, and matrix instruction encodings.
- **[AMD CDNA 5 Architecture Whitepaper](https://www.amd.com/content/dam/amd/en/documents/products/technologies/cdna/amd-cdna5-whitepaper.pdf)** — AMD's pre-shipping whitepaper on the CDNA 5 architecture and Instinct MI455X GPU behind the Helios rack-scale system.
- **[HIP Hardware Implementation](https://rocm.docs.amd.com/projects/HIP/en/latest/understand/hardware_implementation.html)** — ROCm documentation on how AMD GPU hardware blocks map to the HIP programming model's threads, warps, and memory.
- **[MI350 Series Performance Counters](https://rocm.docs.amd.com/en/latest/reference/gpu-arch/mi350-performance-counters.html)** — ROCm reference listing the hardware performance counters and derived metrics available on MI350 and MI355 GPUs.
- **[TheRock](https://github.com/ROCm/TheRock)** — Open-source build system that assembles ROCm from source into redistributable SDKs for AMD GPUs. <sub>MIT · ★ 1.4k · updated 2026-10</sub>

### Google TPU

- **[TPU7x (Ironwood) Documentation](https://docs.cloud.google.com/tpu/docs/tpu7x)** ⭐ — Google Cloud's reference for Ironwood TPU chip specs, pod topologies, VM configurations, and supported frameworks.
- **[TPU 8t and TPU 8i Technical Deep Dive](https://cloud.google.com/blog/products/compute/tpu-8t-and-tpu-8i-technical-deep-dive)** — Google Cloud blog detailing the eighth-generation TPU 8t training chip and TPU 8i inference chip, including the Boardfly topology.
- **[Pallas TPU Hardware Model](https://docs.jax.dev/en/latest/pallas/tpu/hardware.html)** — JAX documentation on the TPU memory spaces, core structure, and pipelining that Pallas kernels must account for.
- **[TPU v4](https://arxiv.org/abs/2304.01433)** 📄 — Google's paper on the TPU v4 supercomputer, its optical circuit-switched interconnect, and embedding-accelerating SparseCores. <sub>ISCA 2023</sub>
- **[vLLM JAX (tpu-inference)](https://github.com/vllm-project/tpu-inference)** 🧪 — Hardware plugin that serves JAX and PyTorch models on TPUs through vLLM, moving to the vllm-project/vllm-jax repository. <sub>Apache-2.0 · ★ 467 · updated 2026-10</sub>

### AWS Trainium & Inferentia

- **[AWS Neuron Documentation](https://awsdocs-neuron.readthedocs-hosted.com/en/latest/)** ⭐ — Index for AWS's SDK for Trainium and Inferentia, covering vLLM serving, PyTorch and JAX training, and the Neuron compiler and runtime.
- **[Trainium and Inferentia2 Architecture Guide](https://awsdocs-neuron.readthedocs-hosted.com/en/latest/nki/guides/architecture/trainium_inferentia2_arch.html)** — AWS Neuron documentation on the NeuronCore-v2 architecture shared by Trainium and Inferentia2 chips, written for NKI kernel authors.
- **[Trainium2 Architecture Guide](https://awsdocs-neuron.readthedocs-hosted.com/en/latest/nki/guides/architecture/trainium2_arch.html)** — AWS Neuron documentation on Trainium2's NeuronCore-v3 updates versus Trainium and Inferentia2, for NKI kernel development.
- **[Trainium3 Architecture Guide](https://awsdocs-neuron.readthedocs-hosted.com/en/latest/nki/guides/architecture/trainium3_arch.html)** — AWS Neuron documentation on the fourth-generation NeuronDevice architecture updates in Trainium3 over Trainium2.
- **[NKI Performance Optimizations Guide](https://awsdocs-neuron.readthedocs-hosted.com/en/latest/nki/deep-dives/nki_perf_guide.html)** — AWS guide to profiling NKI kernels with Neuron Explorer and applying common fixes for Trainium performance bottlenecks.

### Other Accelerators & ASICs

- **[TT-Metalium](https://github.com/tenstorrent/tt-metal)** ⭐ — Tenstorrent's low-level kernel programming model and TT-NN operator library for its Wormhole and Blackhole accelerators. <sub>Apache-2.0 · ★ 1.7k · updated 2026-10</sub>
- **[Think Fast: A Tensor Streaming Processor (TSP) for Accelerating Deep Learning Workloads](https://doi.org/10.1109/ISCA45697.2020.00023)** 📄 — Groq's ISCA 2020 paper on the deterministic, compiler-scheduled Tensor Streaming Processor behind its LPU accelerators. <sub>ISCA 2020</sub>
- **[Cerebras SDK](https://sdk.cerebras.ai/)** — Documentation for writing custom CSL kernels on the Cerebras Wafer-Scale Engine, with the host runtime and hardware model.
- **[SambaNova SN50 RDU](https://sambanova.ai/hubfs/SambaNova%20SN50%20RDU.pdf)** — SambaNova's datasheet for the pre-shipping SN50 Reconfigurable Dataflow Unit, built for the memory-bound decode phase of inference.
- **[d-Matrix DMX Compressor](https://github.com/d-matrix-ai/dmx-compressor)** — PyTorch toolkit for quantization, sparsity, and operator approximation that targets deployment on d-Matrix Corsair hardware. <sub>Apache-2.0 · ★ 21 · updated 2026-09</sub>
- **[Qualcomm Cloud AI SDK](https://github.com/qualcomm/cloud-ai-sdk)** — Qualcomm's compiler, runtime, and model recipes for deploying vision and generative AI models on Cloud AI 100 accelerators. <sub>BSD-3-Clause-Clear · ★ 85 · updated 2026-10</sub>
- **[vLLM QAIC Plugin](https://github.com/qualcomm/vllm-qaic)** — Hardware plugin that serves inference through the Qualcomm Cloud AI Compiler on Cloud AI 100 and 100 Ultra accelerators. <sub>Apache-2.0 · ★ 13 · updated 2026-10</sub>
- **[CANN (Compute Architecture for Neural Networks)](https://www.hiascend.com/document/detail/en/CANNCommunityEdition/900/index/index.html)** — Huawei's heterogeneous computing software stack for Ascend NPUs, covering operator libraries, the graph engine, and Ascend C.
- **[vLLM Ascend](https://github.com/vllm-project/vllm-ascend)** — Community-maintained vLLM hardware plugin for running inference on Huawei Ascend NPUs. <sub>Apache-2.0 · ★ 3k · updated 2026-10</sub>
- **[Intel Gaudi Documentation](https://docs.habana.ai/en/latest/)** — Intel's documentation for the Gaudi 2 and Gaudi 3 accelerators, covering model migration, PyTorch integration, and optimization.
- **[vLLM Gaudi](https://github.com/vllm-project/vllm-gaudi)** — Community-maintained vLLM hardware plugin that targets Intel Gaudi accelerators. <sub>Apache-2.0 · ★ 65 · updated 2026-10</sub>
- **[Intel GPU D-Series (Crescent Island)](https://www.intel.com/content/www/us/en/products/details/discrete-gpus/data-center-gpu/d-series.html)** — Intel's pre-release product page for the Crescent Island inference GPU, built on Xe3P with up to 480GB of LPDDR5X and no HBM.
- **[Maia 200](https://blogs.microsoft.com/blog/2026/01/26/maia-200-the-ai-accelerator-built-for-inference/)** — Microsoft's announcement of the Maia 200 inference accelerator, covering its HBM3e memory, FP4/FP8 tensor cores, and scale-up network.
- **[Meta MTIA](https://about.fb.com/news/2026/03/expanding-metas-custom-silicon-to-power-our-ai-workloads/)** — Meta's roadmap post on its MTIA chip family, covering the MTIA 300 through 500 generations and their PyTorch-based software stack.

### Interconnects & Networking

- **[Ultra Ethernet Specification v1.0.3](https://ultraethernet.org/wp-content/uploads/sites/20/2026/08/UE-Specification-1.0.3.pdf)** ⭐ — The Ultra Ethernet Consortium's open specification for high-performance Ethernet transport, congestion control, and RDMA semantics.
- **[Multi-Node NVLink IMEX Guide](https://docs.nvidia.com/multi-node-nvlink-systems/imex-guide/overview.html)** — NVIDIA's overview of the IMEX service that exports GPU memory across NVLink-connected nodes in multi-node systems.
- **[UALink Common 2.0 Specification](https://ualinkconsortium.org/specification/)** — UALink Consortium's open specification for scale-up accelerator interconnects, adding in-network compute in version 2.0.
- **[InfiniBand and RDMA (Linux Kernel Documentation)](https://docs.kernel.org/infiniband/index.html)** — Linux kernel documentation for the InfiniBand subsystem, covering the verbs API, RDMA transports, and driver interfaces.

### Hardware Analysis

- **[SemiAnalysis](https://newsletter.semianalysis.com/)** ⭐ — Semiconductor and AI infrastructure newsletter covering accelerator architecture, supply chains, and data center economics.
- **[Chips and Cheese](https://chipsandcheese.com/)** — Independent site publishing microarchitecture deep dives and microbenchmarks of GPUs, CPUs, and AI accelerators.
- **[Epoch AI Machine Learning Hardware Database](https://epoch.ai/data/machine-learning-hardware)** — Dataset of specifications, release dates, and prices for GPUs and TPUs used in notable AI models, downloadable as CSV.
- **[TechPowerUp GPU Database](https://www.techpowerup.com/gpu-specs/)** — Searchable database of GPU specifications, including datacenter accelerators, compiled from vendor datasheets.

## Benchmarking & Capacity Planning

Measuring inference honestly: load generators, public benchmark suites, real workload traces, simulators, and the methodology that makes numbers comparable.

### Benchmark Tools

- **[AIPerf](https://github.com/ai-dynamo/aiperf)** ⭐ — Load generator for OpenAI-compatible servers with concurrency, request-rate, and trace-replay modes plus goodput; replaces Triton's GenAI-Perf. <sub>Apache-2.0 · ★ 827 · updated 2026-10</sub>
- **[GuideLLM](https://github.com/vllm-project/guidellm)** — SLO-oriented load tester that sweeps synchronous, concurrent, and rate-based traffic and reports full TTFT and inter-token latency distributions. <sub>Apache-2.0 · ★ 1.7k · updated 2026-10</sub>
- **[vLLM Benchmark CLI](https://docs.vllm.ai/en/latest/benchmarking/cli/)** — Usage guide for vllm bench serve and throughput, which drive online or offline load from ShareGPT, BurstGPT, random, multimodal, or custom datasets. <sub>Apache-2.0 · ★ 96k · updated 2026-10</sub>
- **[genai-bench](https://github.com/sgl-project/genai-bench)** — Token-level serving benchmark from the SGLang project with a live progress dashboard, traffic-scenario sweeps, and Excel and plot reports. <sub>MIT · ★ 332 · updated 2026-10</sub>
- **[Inference Perf](https://github.com/kubernetes-sigs/inference-perf)** — Server-agnostic load generator from Kubernetes WG Serving with goodput, multi-stage rate sweeps, and Azure or OpenTelemetry trace replay. <sub>Apache-2.0 · ★ 267 · updated 2026-10</sub>
- **[Inference Benchmarker](https://github.com/huggingface/inference-benchmarker)** — Rust load tester for OpenAI-compatible text-generation servers with open-loop constant-rate runs, automatic throughput sweeps, and workload presets. <sub>Apache-2.0 · ★ 176 · updated 2026-09</sub>
- **[llama-bench](https://github.com/ggml-org/llama.cpp/blob/master/tools/llama-bench/README.md)** — Bundled llama.cpp tool that measures prompt-processing and token-generation speed across models, batch sizes, threads, and GPU offload settings. <sub>MIT · ★ 133k · updated 2026-10</sub>

### Suites & Leaderboards

- **[MLPerf Inference: Datacenter](https://mlcommons.org/benchmarks/inference-datacenter/)** ⭐ — Peer-reviewed industry benchmark with closed and open divisions, server and offline scenarios, and accuracy targets; latest round is v6.1 (September 2026). <sub>Apache-2.0 · ★ 1.7k · updated 2026-09</sub>
- **[InferenceX](https://inferencex.semianalysis.com/)** ⭐ — SemiAnalysis benchmark, formerly InferenceMAX, that reruns public serving recipes on NVIDIA, AMD, and TPU systems through open CI with published logs. <sub>Apache-2.0 · ★ 1.9k · updated 2026-10</sub>
- **[MLPerf Endpoints](https://mlcommons.org/benchmarks/endpoints/)** — MLCommons benchmark of live API endpoints that reports throughput, per-user speed, concurrency, and P90 TTFT as curves, with rolling submissions. <sub>Apache-2.0 · ★ 25 · updated 2026-10</sub>
- **[MLPerf Client](https://mlcommons.org/benchmarks/client/)** — MLCommons app that times LLM, image generation, and agentic workloads on Windows, macOS, and Linux PCs with GPUs or NPUs; v2.0 shipped in August 2026. <sub>Apache-2.0 · ★ 95 · updated 2026-09</sub>
- **[Artificial Analysis](https://artificialanalysis.ai/)** — Independent leaderboards comparing models and API providers on quality indexes, output speed, latency, and price, with published methodology.
- **[AA-AgentPerf](https://artificialanalysis.ai/methodology/agentperf)** — Hardware benchmark that plots total throughput against per-agent output speed on agentic coding workloads, normalized per accelerator, megawatt, and dollar.
- **[ML.ENERGY Leaderboard](https://ml.energy/leaderboard/)** — Measured time and GPU energy per response for open LLM, multimodal, and diffusion models served on production engines, from the ML.ENERGY benchmark. <sub>Apache-2.0 · ★ 18 · updated 2026-05</sub>

### Workload Traces & Datasets

- **[Azure Public Dataset (LLM inference traces)](https://github.com/Azure/AzurePublicDataset)** ⭐ — Timestamped token-count traces from Azure LLM services behind the Splitwise and DynamoLLM papers, plus multimodal and Copilot coding-agent traces. <sub>CC-BY-4.0 · ★ 1.2k · updated 2026-10</sub>
- **[BurstGPT](https://github.com/HPMLL/BurstGPT)** — Months of GPT-3.5 and GPT-4 request logs from an Azure-hosted service with timestamps and token counts, used to model bursty arrivals. <sub>CC-BY-4.0 · ★ 293 · updated 2026-06</sub>
- **[ServeGen](https://github.com/alibaba/ServeGen)** — Characterizes Alibaba Cloud Model Studio traffic for language, multimodal, and reasoning models and generates synthetic workloads that keep its burstiness. <sub>Apache-2.0 · ★ 185 · updated 2026-08</sub>
- **[Mooncake Traces](https://github.com/kvcache-ai/Mooncake/blob/main/FAST25-release/README.md)** — Kimi production request traces with input and output lengths and hashed prefix blocks for conversation and tool-use workloads, released with the FAST'25 paper. <sub>Apache-2.0 · ★ 6.9k · updated 2026-10</sub>
- **[Alibaba Cluster Trace Program](https://github.com/alibaba/clusterdata)** — Alibaba production traces spanning GPU cluster scheduling, generative AI serving telemetry, and a six-month LLM inference trace from its MaaS platform. <sub>★ 2.2k · updated 2026-10</sub>

### Simulators & Capacity Planners

- **[LLM Engineer's Almanac](https://modal.com/llm-almanac/advisor)** ⭐ — Benchmark-backed advisor that ranks vLLM, SGLang, and TensorRT-LLM setups by latency target and cost per token, with guides on benchmarking and quantization.
- **[AISimulate](https://github.com/ai-dynamo/aisimulate)** — Predicts serving latency and throughput from measured operator data and searches aggregated and disaggregated configs offline; succeeds AIConfigurator. <sub>Apache-2.0 · ★ 107 · updated 2026-10</sub>
- **[AIConfigurator](https://github.com/ai-dynamo/aiconfigurator)** ⚠️ — NVIDIA configuration search for disaggregated Dynamo and llm-d deployments; accepts only fixes while its estimator moves to AISimulate. <sub>Apache-2.0 · ★ 462 · updated 2026-10</sub>
- **[Vidur](https://github.com/microsoft/vidur)** ⚠️ — Simulator that predicts LLM serving latency and throughput from profiled operators, for testing schedulers and parallelism plans without GPUs. <sub>MIT · ★ 713 · updated 2026-08</sub>
- **[LLM-Viewer](https://github.com/hahnyuan/LLM-Viewer)** ⚠️ — Roofline-based analyzer that estimates per-layer compute, memory traffic, and latency of LLM prefill and decode on a chosen accelerator. <sub>MIT · ★ 689 · updated 2024-09</sub>
- **[llm-optimizer](https://github.com/bentoml/llm-optimizer)** ⚠️ — Sweeps SGLang and vLLM launch arguments under latency and throughput constraints and offers a theoretical estimate mode for quick what-if checks. <sub>Apache-2.0 · ★ 202 · updated 2026-10</sub>

### Metrics & Methodology

- **[Roofline: An Insightful Visual Performance Model for Multicore Architectures](https://dl.acm.org/doi/10.1145/1498765.1498785)** ⭐ 📄 — Bounds attainable performance by arithmetic intensity, peak compute, and memory bandwidth; the usual lens for compute-bound prefill and memory-bound decode. <sub>Communications of the ACM 2009</sub>
- **[MLPerf Inference Benchmark](https://arxiv.org/abs/1911.02549)** 📄 — Defines the LoadGen scenarios, latency bounds, and accuracy targets behind MLPerf Inference and explains how they keep results comparable. <sub>ISCA 2020 · [code](https://github.com/mlcommons/inference)</sub>
- **[CUTLASS GEMM Performance Measurement Methodology](https://docs.nvidia.com/cutlass/latest/media/docs/cpp/gemm_performance_measurement_methodology_guidelines.html)** — NVIDIA guidance on separate warmup loops, buffer rotation for cold caches, fixed-clock versus fixed-power runs, and input entropy for reproducible GEMM numbers.
- **[Etalon: Holistic Performance Evaluation Framework for LLM Inference Systems](https://arxiv.org/abs/2407.07000)** 📄 — Argues that TTFT and TBT averages hide streaming stalls and proposes fluidity-index, a deadline-based metric, with a harness for measuring it. <sub>arXiv 2024 · [code](https://github.com/project-etalon/etalon)</sub>
- **[AI Systems Performance Checklist](https://github.com/cfregly/ai-performance-engineering/blob/main/docs/appendix.md)** — Over 200 tuning and measurement items from Fregly's O'Reilly book, from steady-state timing and OS and CUDA settings up to cluster-scale cost controls. <sub>Apache-2.0 · ★ 2.1k · updated 2026-10</sub>

## Observability & Operations

Running inference in production: profiling, telemetry, correctness and determinism, cost and energy, and security.

### Profiling & Debugging

- **[Nsight Systems](https://docs.nvidia.com/nsight-systems/UserGuide/)** ⭐ — System-wide timeline profiler that lines up CPU threads, OS runtime, CUDA API calls, kernels, memory copies, and NVTX ranges to expose idle GPU time.
- **[Nsight Compute](https://docs.nvidia.com/nsight-compute/ProfilingGuide/)** — Kernel profiler that reads hardware counters to report roofline position, memory-hierarchy throughput, occupancy, and warp stall reasons per CUDA kernel.
- **[Compute Sanitizer](https://docs.nvidia.com/compute-sanitizer/ComputeSanitizer/)** — CUDA toolkit checkers (memcheck, racecheck, initcheck, synccheck) that catch out-of-bounds accesses, shared-memory races, and synchronization misuse.
- **[PyTorch Profiler](https://docs.pytorch.org/docs/stable/profiler.html)** — Captures operator, GPU kernel, and memory events from PyTorch programs and exports Chrome-format traces for viewing in Perfetto or analysis with HTA.
- **[Holistic Trace Analysis](https://github.com/facebookresearch/HolisticTraceAnalysis)** — Analyzes PyTorch profiler traces across ranks, splitting GPU time into compute, communication, and idle, with overlap and critical-path reports. <sub>MIT · ★ 564 · updated 2026-10</sub>
- **[Perfetto](https://github.com/google/perfetto)** — Browser-based trace viewer with a SQL trace processor, used to inspect PyTorch, Chrome-format, and Linux system traces without uploading them. <sub>Apache-2.0 · ★ 6.7k · updated 2026-10</sub>
- **[ROCm Compute Profiler](https://rocm.docs.amd.com/projects/rocprofiler-compute/en/latest/)** — Kernel-level profiler for AMD Instinct GPUs that turns hardware counters into speed-of-light, memory-chart, and roofline analyses. <sub>★ 543 · updated 2026-10</sub>
- **[ROCprofiler-SDK and rocprofv3](https://rocm.docs.amd.com/projects/rocprofiler-sdk/en/latest/)** — ROCm tracing and counter-collection library whose rocprofv3 CLI records HIP API, kernel, and memory-copy timelines; supersedes rocprof and rocprofv2. <sub>★ 543 · updated 2026-10</sub>

### Monitoring & Telemetry

- **[DCGM Exporter](https://github.com/NVIDIA/dcgm-exporter)** ⭐ — Exposes GPU utilization, memory, power, clocks, and XID errors from DCGM as Prometheus metrics, typically deployed as a Kubernetes DaemonSet. <sub>Apache-2.0 · ★ 1.9k · updated 2026-09</sub>
- **[NVIDIA DCGM](https://github.com/NVIDIA/DCGM)** — Data Center GPU Manager library and dcgmi CLI for fleet health checks, active diagnostics, and policy alerts; the telemetry source behind dcgm-exporter. <sub>Apache-2.0 · ★ 809 · updated 2026-10</sub>
- **[AMD Device Metrics Exporter](https://github.com/ROCm/device-metrics-exporter)** — Prometheus exporter for AMD GPU temperature, utilization, memory, power, and PCIe metrics, deployable with Helm on Kubernetes or alongside Slurm. <sub>Apache-2.0 · ★ 68 · updated 2026-10</sub>
- **[vLLM Production Metrics](https://docs.vllm.ai/en/latest/usage/metrics/)** — Reference for the Prometheus metrics vLLM serves, including TTFT and inter-token latency histograms, KV cache usage, prefix-cache hits, and deprecations. <sub>Apache-2.0 · ★ 96k · updated 2026-10</sub>
- **[SGLang Production Metrics](https://docs.sglang.io/docs/references/production_metrics)** — Lists the Prometheus metrics SGLang exposes with --enable-metrics, from TTFT and TPOT histograms to cache hit rate, plus a ready Grafana stack. <sub>Apache-2.0 · ★ 38k · updated 2026-10</sub>
- **[OpenTelemetry GenAI Semantic Conventions](https://github.com/open-telemetry/semantic-conventions-genai)** 🧪 — Draft span, metric, and event names for GenAI clients, servers, agents, and MCP, including server-side time-to-first-token and time-per-output-token metrics. <sub>Apache-2.0 · ★ 488 · updated 2026-10</sub>

### Correctness & Determinism

- **[batch_invariant_ops](https://github.com/thinking-machines-lab/batch_invariant_ops)** ⭐ — Triton matmul, log-softmax, and mean kernels swapped in through torch.Library so results do not depend on batch size; includes a deterministic vLLM example. <sub>MIT · ★ 1.1k · updated 2025-11</sub>
- **[vLLM Batch Invariance](https://docs.vllm.ai/en/latest/features/batch_invariance/)** 🧪 — Explains the beta VLLM_BATCH_INVARIANT mode, its supported NVIDIA, AMD, and Intel GPUs, validated models, and the tensor-parallel all-reduce caveat. <sub>Apache-2.0 · ★ 96k · updated 2026-10</sub>
- **[SGLang Deterministic Inference](https://docs.sglang.io/docs/advanced_features/deterministic_inference)** — Covers the --enable-deterministic-inference flag, which attention backends keep radix caching and CUDA graphs, and seeded sampling for repeatable rollouts. <sub>Apache-2.0 · ★ 38k · updated 2026-10</sub>
- **[TBIK: Deterministic Inference across Tensor Parallel Sizes](https://arxiv.org/abs/2511.17826)** 📄 — Tree-based invariant matmul and reduction kernels that give bit-identical results across tensor-parallel sizes, aligning vLLM rollouts with FSDP training. <sub>ICML 2026 · [code](https://github.com/nanomaoli/llm_reproducibility)</sub>
- **[Understanding and Mitigating Numerical Sources of Nondeterminism in LLM Inference](https://arxiv.org/abs/2506.09501)** 📄 — Shows how GPU count, GPU type, and batch size change reasoning-model outputs under BF16 greedy decoding, and proposes computing in FP32 over 16-bit weights. <sub>NeurIPS 2025 · [code](https://github.com/nanomaoli/llm_reproducibility)</sub>
- **[Kimi Vendor Verifier](https://github.com/MoonshotAI/Kimi-Vendor-Verifier)** — Moonshot's test suite and public scoreboard checking that third-party Kimi API providers match reference accuracy, tool-call validity, and token accounting. <sub>MIT · ★ 186 · updated 2026-09</sub>

### Cost & Energy Efficiency

- **[Zeus](https://github.com/ml-energy/zeus)** ⭐ — Measures energy of code regions on NVIDIA and AMD GPUs, CPUs, DRAM, Apple silicon, and Jetson, and ships optimizers for GPU power limits and batch size. <sub>Apache-2.0 · ★ 383 · updated 2026-10</sub>
- **[Kepler](https://github.com/sustainable-computing-io/kepler)** — CNCF Sandbox Prometheus exporter that estimates CPU, DRAM, and GPU energy and attributes it to Kubernetes nodes, pods, and containers. <sub>Apache-2.0 · ★ 1.6k · updated 2026-10</sub>
- **[AI Energy Score](https://huggingface.github.io/AIEnergyScore/)** — Relative star ratings for model energy efficiency, based on H100 GPU energy per 1,000 queries across standard tasks, with an open Docker harness. <sub>MIT · ★ 43 · updated 2025-12</sub>
- **[Silicon Index](https://www.silicondata.com/products/silicon-index)** — Daily GPU rental price indices for H100, H200, B200, B300, A100, and MI300X across neoclouds and hyperscalers, plus a blended LLM token price index.
- **[LLM Prices](https://www.llm-prices.com/)** — Calculator and price table for hosted model APIs that totals input, cached-input, and output token costs for a given request mix. <sub>★ 196 · updated 2026-10</sub>

### Security & Confidential Inference

- **[NVIDIA Confidential Computing Documentation](https://docs.nvidia.com/confidential-computing/)** — Guides for running AI workloads inside GPU trusted execution environments as bare metal, confidential VMs, or confidential containers, with attestation.
- **[Apple Private Cloud Compute Security Guide](https://security.apple.com/documentation/private-cloud-compute)** — Design of Apple's server-side inference service, covering stateless processing, hardware-rooted attestation, a transparency log, and a research VM.
- **[LiteLLM PyPI Supply-Chain Compromise Advisory (March 2026)](https://docs.litellm.ai/blog/security-update-march-2026)** — Maintainer advisory on two trojaned PyPI releases that stole cloud, SSH, and Kubernetes credentials via a compromised CI scanner, with indicators and fixes.
- **[Hugging Face Pickle Scanning](https://huggingface.co/docs/hub/security-pickle)** — Explains why pickle-based checkpoints can run code on load, how the Hub flags risky imports in uploads, and why safetensors avoids the problem.
- **[Fickling](https://github.com/trailofbits/fickling)** — Trail of Bits decompiler and static analyzer for pickle and PyTorch files that flags code-executing payloads before a model is loaded. <sub>LGPL-3.0 · ★ 675 · updated 2026-10</sub>
- **[vLLM Security Guide](https://docs.vllm.ai/en/latest/usage/security/)** — Hardening notes for vLLM deployments covering unauthenticated inter-node traffic, endpoints that --api-key leaves open, and trusted cache directories. <sub>Apache-2.0 · ★ 96k · updated 2026-10</sub>

## Edge, Mobile & Browser

Inference outside the datacenter: phones, laptops, NPUs, browsers, and embedded boards.

### Mobile & Embedded Runtimes

- **[ExecuTorch](https://github.com/pytorch/executorch)** ⭐ — PyTorch's on-device runtime that exports models ahead of time and runs them on phones, wearables, and microcontrollers through pluggable hardware backends. <sub>BSD-3-Clause · ★ 5.1k · updated 2026-10</sub>
- **[LiteRT-LM](https://github.com/google-ai-edge/LiteRT-LM)** — LLM orchestration layer on top of LiteRT for Android, iOS, web, desktop, and IoT, with GPU and NPU paths and multi-token prediction for Gemma 4. <sub>Apache-2.0 · ★ 6.8k · updated 2026-10</sub>
- **[LiteRT](https://github.com/google-ai-edge/LiteRT)** — Runtime that succeeds TensorFlow Lite, converting models and running them on phones and edge devices through CPU, GPU, and NPU accelerators. <sub>Apache-2.0 · ★ 3.5k · updated 2026-10</sub>
- **[MediaPipe LLM Inference API](https://developers.google.com/edge/mediapipe/solutions/genai/llm_inference)** ⚠️ — MediaPipe task for running LLMs in Android, iOS, and web apps, now marked maintenance-only by Google, which recommends LiteRT-LM for new projects. <sub>Apache-2.0 · ★ 37k · updated 2026-10</sub>
- **[MNN](https://github.com/alibaba/MNN)** — Lightweight C++ inference engine from Alibaba for mobile and embedded devices, including an LLM module for running chat models on Android and iOS. <sub>Apache-2.0 · ★ 16k · updated 2026-10</sub>
- **[MLC LLM](https://github.com/mlc-ai/mlc-llm)** — Compiler-based LLM deployment stack built on TVM that targets iOS, Android, desktop GPUs, and browsers from one model definition. <sub>Apache-2.0 · ★ 23k · updated 2026-10</sub>
- **[Cactus](https://github.com/cactus-compute/cactus)** — Hybrid edge-and-cloud engine for phones and wearables with its own kernels, quantization, and OpenAI-style APIs; source-available under a revenue-gated license. <sub>source-available · ★ 6.2k · updated 2026-09</sub>
- **[Qualcomm AI Hub](https://aihub.qualcomm.com/)** — Qualcomm's portal and Workbench for compiling, profiling, and validating models on Snapdragon devices, with a catalog of pre-optimized models.
- **[GenieX](https://github.com/qualcomm/GenieX)** 🧪 — Developer-preview runtime for LLMs and VLMs on Snapdragon that dispatches to llama.cpp or Qualcomm AI Engine Direct across NPU, GPU, and CPU; formerly Nexa SDK. <sub>BSD-3-Clause · ★ 8.5k · updated 2026-10</sub>

### Apple Silicon

- **[MLX](https://github.com/ml-explore/mlx)** ⭐ — Array framework for Apple silicon with NumPy-style Python and C++ APIs, lazy evaluation, and unified memory; the base layer under mlx-lm. <sub>MIT · ★ 29k · updated 2026-10</sub>
- **[MLX Swift](https://github.com/ml-explore/mlx-swift)** — Swift bindings for MLX so iOS and macOS apps can run array computation and neural networks natively on Apple silicon. <sub>MIT · ★ 2.1k · updated 2026-10</sub>
- **[MLX Swift LM](https://github.com/ml-explore/mlx-swift-lm)** — Swift package that loads and runs LLMs and vision-language models on MLX inside iOS and macOS apps, layered on the MLX Swift bindings. <sub>MIT · ★ 847 · updated 2026-10</sub>
- **[Core ML Tools](https://github.com/apple/coremltools)** — Converter from PyTorch and other frameworks to the Core ML format, with quantization, palettization, and pruning tools for shipping models on Apple devices. <sub>BSD-3-Clause · ★ 5.4k · updated 2026-09</sub>
- **[Apple Foundation Models Framework](https://developer.apple.com/documentation/foundationmodels)** — Swift framework that lets apps prompt Apple's on-device language model, with guided generation, tool calling, and streamed responses. <sub>proprietary</sub>
- **[Apple Core AI](https://developer.apple.com/documentation/coreai)** 🧪 — Apple's WWDC26 beta framework for running LLMs and generative models on-device across CPU, GPU, and Neural Engine; announced as Core ML's successor. <sub>proprietary</sub>

### PCs & NPUs

- **[Windows ML](https://learn.microsoft.com/en-us/windows/ai/new-windows-ml/overview)** — Windows-managed copy of ONNX Runtime that routes models to NPU, GPU, or CPU through execution providers that Windows installs and keeps updated. <sub>proprietary · ★ 22k · updated 2026-10</sub>
- **[ONNX Runtime QNN Execution Provider](https://onnxruntime.ai/docs/execution-providers/QNN-ExecutionProvider.html)** — ONNX Runtime provider that offloads models to the Hexagon NPU on Snapdragon through Qualcomm AI Engine Direct, including Windows on Arm laptops. <sub>MIT · ★ 22k · updated 2026-10</sub>
- **[AMD Ryzen AI Software](https://ryzenai.docs.amd.com/en/latest/)** — AMD's stack for running ONNX and LLM workloads on Ryzen AI PCs, using the XDNA NPU and integrated GPU through ONNX Runtime and the Quark quantizer. <sub>MIT · ★ 894 · updated 2026-08</sub>
- **[OpenVINO NPU Plugin](https://docs.openvino.ai/2026/openvino-workflow/running-inference/inference-devices-and-modes/npu-device.html)** — OpenVINO documentation for its NPU plugin, covering drivers, the model compiler, and model caching for running inference on Intel neural processors. <sub>Apache-2.0 · ★ 11k · updated 2026-10</sub>
- **[Qualcomm AI Engine Direct SDK](https://www.qualcomm.com/developer/software/qualcomm-ai-engine-direct-sdk)** — Qualcomm's low-level runtime API for the Hexagon NPU, Adreno GPU, and Kryo CPU, which Genie and ONNX Runtime's QNN provider build on; also called QAIRT. <sub>proprietary</sub>

### Browser & WebGPU

- **[WebLLM](https://github.com/mlc-ai/web-llm)** ⭐ — In-browser LLM engine that runs models on WebGPU with an OpenAI-style API, streaming output, and web-worker isolation. <sub>Apache-2.0 · ★ 19k · updated 2026-10</sub>
- **[Transformers.js](https://github.com/huggingface/transformers.js)** — Runs Hugging Face models in browsers, Node, Bun, and Deno on ONNX Runtime; version 4 swaps in a rewritten C++ WebGPU runtime. <sub>Apache-2.0 · ★ 16k · updated 2026-10</sub>
- **[ONNX Runtime Web](https://onnxruntime.ai/docs/tutorials/web/)** — Documentation for the browser builds of ONNX Runtime, with WebAssembly, WebGPU, and WebNN execution providers for in-page inference. <sub>MIT · ★ 22k · updated 2026-10</sub>
- **[wllama](https://github.com/ngxson/wllama)** — WebAssembly binding for llama.cpp that runs GGUF models in a browser tab, with worker isolation, split-file loading, and WebGPU support in v3. <sub>MIT · ★ 1.4k · updated 2026-10</sub>
- **[WebGPU Specification](https://www.w3.org/TR/webgpu/)** — W3C specification for the browser API that exposes GPU compute and rendering, which in-browser LLM runtimes use for acceleration. <sub>★ 5.5k · updated 2026-10</sub>
- **[Web Neural Network API (WebNN)](https://www.w3.org/TR/webnn/)** 🧪 — W3C candidate recommendation draft for a browser API that runs neural network graphs on NPUs, GPUs, and CPUs; browser availability is still limited. <sub>★ 572 · updated 2026-10</sub>
- **[Chrome Prompt API](https://developer.chrome.com/docs/ai/prompt-api)** 🧪 — Chrome's JavaScript API for prompting Gemini Nano on-device; the docs say the web version is still in development and list storage and hardware needs. <sub>proprietary</sub>

### Embedded Accelerators

- **[Jetson AI Lab](https://www.jetson-ai-lab.com/)** ⭐ — Tutorial hub for running LLMs, vision-language models, and diffusion models locally on Jetson Orin and Thor boards, with community projects.
- **[TensorRT Edge-LLM](https://github.com/NVIDIA/TensorRT-Edge-LLM)** 🧪 — C++ runtime for LLMs and VLMs on Jetson, DRIVE, and DGX Spark with an export and engine-build workflow and no Python dependency at run time. <sub>Apache-2.0 · ★ 604 · updated 2026-10</sub>
- **[jetson-containers](https://github.com/dusty-nv/jetson-containers)** — Modular build system and prebuilt images for ML stacks such as PyTorch, vLLM, SGLang, and MLC on Jetson, matched to JetPack and CUDA versions. <sub>MIT · ★ 4.9k · updated 2026-10</sub>
- **[NVIDIA Jetson Thor](https://www.nvidia.com/en-us/autonomous-machines/embedded-systems/jetson-thor/)** — Blackwell-based Jetson module and developer kit for robots and edge systems, aimed at running LLM, VLM, and vision-language-action models on the device.
- **[Raspberry Pi AI HAT+ Documentation](https://www.raspberrypi.com/documentation/accessories/ai-hat-plus.html)** — Official Raspberry Pi documentation for the AI HAT+ boards that attach a Hailo accelerator to a Pi 5 over PCIe, covering setup and supported software.
- **[Hailo AI Software Suite](https://hailo.ai/products/hailo-software/hailo-ai-software-suite/)** — Hailo's compiler, HailoRT runtime, and model zoo for its accelerators, including precompiled LLM, VLM, and speech models served through a REST API. <sub>★ 228 · updated 2026-10</sub>

## Verticals

Workload-specific serving: tools and research that only make sense for one modality or workload shape. General engines that also support these workloads live in their own sections and are tagged for the site's filters.

### Reasoning & Test-Time Compute

- **[Scaling LLM Test-Time Compute Optimally](https://arxiv.org/abs/2408.03314)** ⭐ 📄 — Studies how to spend extra inference compute per prompt, comparing verifier-guided search with sequential revision, and when that beats a larger model. <sub>ICLR 2025</sub>
- **[DeepSeek-R1](https://arxiv.org/abs/2501.12948)** 📄 — Report on training reasoning models with large-scale reinforcement learning, the source of the long thinking traces that reasoning-aware serving has to handle. <sub>Nature 2025</sub>
- **[vLLM Reasoning Outputs](https://docs.vllm.ai/en/latest/features/reasoning_outputs/)** — Explains the reasoning-parser flag that returns a model's thinking text in its own response field, and which API endpoints expose it.
- **[SGLang Reasoning Parser](https://docs.sglang.io/docs/advanced_features/separate_reasoning)** — Documents SGLang's per-model reasoning parsers that split chain-of-thought from the answer, with streaming behavior and how to add a parser for a new model.
- **[SGLang Thinking Budget](https://docs.sglang.io/docs/advanced_features/thinking_budget)** — Shows three ways to cap the tokens a reasoning model spends thinking, using chat-template hints, a strict grammar-level limit, or a custom logit processor.
- **[Certaindex (Dynasor)](https://arxiv.org/abs/2412.20993)** 📄 — Measures when a reasoning program's answer has stopped changing and uses that signal in a scheduler to cut wasted tokens across concurrent requests. <sub>NeurIPS 2025 · [code](https://github.com/hao-ai-lab/Dynasor)</sub>

### Multimodal & Omni Models

- **[vLLM-Omni](https://github.com/vllm-project/vllm-omni)** ⭐ — Extends vLLM to any-to-any models by running autoregressive, diffusion, and audio components as separate stages linked by a connector layer. <sub>Apache-2.0 · ★ 7.4k · updated 2026-10</sub>
- **[SGLang-Omni](https://github.com/sgl-project/sglang-omni)** 🧪 — Multi-stage runtime for omni, speech, and TTS models that splits generation into encoder, autoregressive, and vocoder stages behind OpenAI-style APIs. <sub>Apache-2.0 · ★ 1.6k · updated 2026-10</sub>
- **[Encoder Disaggregation for Scalable Multimodal Model Serving](https://vllm.ai/blog/2025-12-15-vllm-epd)** — Explains how moving the vision encoder to its own workers, with a connector and an encoder-output cache, removes its interference with text generation.
- **[Efficiently Serving Large Multimodal Models Using EPD Disaggregation](https://arxiv.org/abs/2501.05460)** 📄 — Places encoding, prefill, and decode of multimodal requests on separate resources to reduce encoder interference and memory pressure in serving. <sub>ICML 2025 · [code](https://github.com/vbdi/epdserve)</sub>
- **[vLLM-Omni: Fully Disaggregated Serving for Any-to-Any Multimodal Models](https://arxiv.org/abs/2602.02204)** 📄 — Describes the stage abstraction that decomposes any-to-any pipelines into components which are scheduled and scaled independently. <sub>arXiv 2026 · [code](https://github.com/vllm-project/vllm-omni)</sub>
- **[vLLM Multimodal Inputs](https://docs.vllm.ai/en/latest/features/multimodal_inputs/)** — Reference for passing images, video, audio, and precomputed embeddings to vLLM, with per-prompt media limits, media caching, and domain restrictions.
- **[SGLang Multimodal Language Models](https://docs.sglang.io/docs/supported-models/multimodal_language_models)** — Supported vision, video, and audio-input models in SGLang with launch commands and flags for feature transport and media preprocessing.

### Image & Video Generation

- **[Diffusers](https://github.com/huggingface/diffusers)** ⭐ — PyTorch library of pipelines, schedulers, and model classes for image, video, and audio diffusion, with offloading and quantization backends for smaller GPUs. <sub>Apache-2.0 · ★ 35k · updated 2026-10</sub>
- **[ComfyUI](https://github.com/Comfy-Org/ComfyUI)** — Node-graph application and API backend for composing diffusion workflows locally, with a large ecosystem of community custom nodes. <sub>GPL-3.0 · ★ 144k · updated 2026-10</sub>
- **[SGLang Diffusion](https://docs.sglang.io/docs/sglang-diffusion)** — Image and video generation inside SGLang, with native pipelines, an OpenAI-compatible API, several parallelism modes, and cache-based acceleration.
- **[xDiT](https://github.com/xdit-project/xDiT)** — Parallel inference engine for diffusion transformers that combines unified sequence parallelism, PipeFusion, CFG parallelism, and parallel VAE across GPUs. <sub>Apache-2.0 · ★ 2.7k · updated 2026-10</sub>
- **[FastVideo](https://github.com/hao-ai-lab/FastVideo)** — Video generation framework that pairs optimized inference with post-training, with recent support for consumer GPUs and Apple silicon. <sub>Apache-2.0 · ★ 4.8k · updated 2026-10</sub>
- **[LightX2V](https://github.com/ModelTC/LightX2V)** — Unified inference framework for text-to-video, image-to-video, text-to-image, and image-editing models, built for low-overhead execution. <sub>Apache-2.0 · ★ 3k · updated 2026-10</sub>
- **[Nunchaku](https://github.com/nunchux-ai/nunchaku)** — Inference engine for 4-bit diffusion transformers that runs SVDQuant-quantized models and ships native ComfyUI nodes. <sub>Apache-2.0 · ★ 4k · updated 2026-09</sub>
- **[cache-dit](https://github.com/vipshop/cache-dit)** — Toolkit on top of Diffusers that adds block-level caching, parallelism, quantization, and CPU offload for diffusion transformers, also wired into other engines. <sub>Apache-2.0 · ★ 1.3k · updated 2026-10</sub>
- **[stable-diffusion.cpp](https://github.com/leejet/stable-diffusion.cpp)** — Pure C/C++ inference for Stable Diffusion, Flux, Wan, and similar models on ggml, with GGUF weights and CPU, CUDA, Vulkan, and Metal backends. <sub>MIT · ★ 7.8k · updated 2026-10</sub>
- **[SVDQuant](https://arxiv.org/abs/2411.05007)** 📄 — Quantizes diffusion-model weights and activations to 4 bits by moving outliers into a low-rank branch that stays in higher precision. <sub>ICLR 2025 · [code](https://github.com/nunchux-ai/nunchaku)</sub>
- **[DistriFusion](https://arxiv.org/abs/2402.19481)** 📄 — Splits a high-resolution image across GPUs and reuses the previous step's feature maps as context, so communication overlaps with computation. <sub>CVPR 2024 · [code](https://github.com/mit-han-lab/distrifuser)</sub>
- **[TeaCache](https://github.com/ali-vilab/TeaCache)** ⚠️ — Training-free cache that reuses transformer outputs across denoising steps when timestep-embedding changes predict small differences in the result. <sub>Apache-2.0 · ★ 1.4k · updated 2025-06</sub>

### Speech & Real-Time Audio

- **[whisper.cpp](https://github.com/ggml-org/whisper.cpp)** ⭐ — Port of OpenAI's Whisper speech recognition to C/C++ on ggml, for CPUs, GPUs, and mobile devices. <sub>MIT · ★ 55k · updated 2026-10</sub>
- **[faster-whisper](https://github.com/SYSTRAN/faster-whisper)** ⚠️ — Reimplements Whisper on CTranslate2 with 8-bit quantization for CPU and GPU, and serves as the transcription backend of servers such as Speaches. <sub>MIT · ★ 26k · updated 2026-10</sub>
- **[Argmax Open-Source SDK](https://github.com/argmaxinc/argmax-oss-swift)** — Swift packages for on-device speech on Apple silicon, covering WhisperKit transcription, SpeakerKit diarization, and TTSKit speech synthesis. <sub>MIT · ★ 6.4k · updated 2026-10</sub>
- **[sherpa-onnx](https://github.com/k2-fsa/sherpa-onnx)** — Offline speech toolkit for recognition, synthesis, diarization, voice activity detection, and enhancement on ONNX Runtime, from servers to phones and boards. <sub>Apache-2.0 · ★ 16k · updated 2026-10</sub>
- **[Kyutai Delayed Streams Modeling](https://github.com/kyutai-labs/delayed-streams-modeling)** — Runnable Kyutai streaming speech-to-text and text-to-speech models built on delayed streams modeling, with batching for real-time use. <sub>Apache-2.0 · ★ 3k · updated 2026-01</sub>
- **[Pipecat](https://github.com/pipecat-ai/pipecat)** — Python framework for real-time voice and multimodal agents that chains transports, speech services, and language models into streaming pipelines. <sub>BSD-2-Clause · ★ 17k · updated 2026-10</sub>
- **[LiveKit Agents](https://github.com/livekit/agents)** — Server-side framework for realtime voice and video agents that plugs speech-to-text, LLM, and text-to-speech services into WebRTC sessions with job dispatch. <sub>Apache-2.0 · ★ 15k · updated 2026-10</sub>
- **[Speaches](https://github.com/speaches-ai/speaches)** 🧪 — OpenAI API-compatible server for streaming transcription, translation, and speech generation, using faster-whisper for STT and Piper or Kokoro for TTS. <sub>MIT · ★ 3.7k · updated 2026-10</sub>
- **[NVIDIA Riva Speech Documentation](https://docs.nvidia.com/deeplearning/riva/user-guide/docs/index.html)** — Guides for NVIDIA's gRPC speech stack covering streaming recognition and synthesis, Docker and Kubernetes deployment, and performance tuning.

### Embeddings, Reranking & Retrieval

- **[Text Embeddings Inference](https://github.com/huggingface/text-embeddings-inference)** ⭐ — Rust server for embedding, reranker, and sequence-classification models with token-based dynamic batching and no graph-compilation step. <sub>Apache-2.0 · ★ 5.1k · updated 2026-10</sub>
- **[Infinity](https://github.com/michaelfeil/infinity)** — REST server for embedding, reranking, and classification models whose v3 line rewrites the Python server as a native Rust service on LibTorch. <sub>MIT · ★ 3k · updated 2026-10</sub>
- **[FastEmbed](https://github.com/qdrant/fastembed)** — Light Python library that produces dense and sparse text embeddings through ONNX Runtime, with no PyTorch dependency and no GPU requirement. <sub>Apache-2.0 · ★ 3.3k · updated 2026-10</sub>
- **[Sentence Transformers](https://github.com/huggingface/sentence-transformers)** — Python library with one API for computing embeddings and reranking, and PyTorch, ONNX, and OpenVINO backends for faster inference. <sub>Apache-2.0 · ★ 19k · updated 2026-10</sub>
- **[vLLM Pooling Models](https://docs.vllm.ai/en/latest/models/pooling_models/)** — How vLLM serves embedding, classification, and scoring or reranking models through its pooling runner, both offline and over online endpoints.
- **[SGLang Embedding Models](https://docs.sglang.io/docs/supported-models/embedding_models)** — Shows how to serve dense embedding models in SGLang through the embeddings endpoint, with Matryoshka and multimodal examples and a supported-model table.

### Decision Models

Models that answer typed questions with calibrated probabilities instead of generating text.

- **[TypeSafe Jev](https://docs.typesafe.ai/introduction)** 💲 — Proprietary decision model behind TypeSafe's System One API that answers choice, score, and yes/no questions about a state with probabilities.
- **[OpenAI Decisions API](https://developers.openai.com/api/docs/guides/decisions)** 💲 — OpenAI endpoint that answers predicate, choice, and score questions about text, images, or JSON with probabilities instead of generated text.
- **[Pydantic AI Decision Models](https://pydantic.dev/docs/ai/models/decision/)** — Guide to running agents on decision models, where each output field becomes a typed question and low-confidence answers can fall back to an LLM. <sub>MIT · ★ 21k · updated 2026-10</sub>
- **[vLLM-SR d3](https://huggingface.co/vllm-sr/d3)** — Open-weight 27B multimodal decision model from the vLLM Semantic Router project for choice, yes/no, and score questions over text, images, and video. <sub>Apache-2.0</sub>
- **[Perplexity Decider](https://huggingface.co/perplexity-ai/pplx-decider-v1.2)** — Open-weight 27B decision model from Perplexity that reads a state and all its questions in one sequence, with a separate readout per question. <sub>Apache-2.0</sub>
- **[Laya](https://huggingface.co/convaiinnovations/laya)** — Non-autoregressive multilingual decision models with a Python runtime that routes each request to a checkpoint and can run on CPU, GPU, or ONNX Runtime. <sub>Apache-2.0 · ★ 34k · updated 2026-10</sub>
- **[Contrastive Language Model (CLM)](https://huggingface.co/Contrastive-LM/CLM-v0.1-8B)** 🧪 — Decision model that trains state and action heads on frozen Qwen3-8B embeddings, so candidate actions are encoded once and ranked against each new state. <sub>Apache-2.0 · ★ 3.1k · updated 2026-10</sub>
- **[JevBench](https://benchmarkheaven.com/jev-models)** — Leaderboard that scores decision models on accuracy, calibration, latency, and cost; run by the same company that operates the Decision Models API.
- **[Decision Models](https://decisionmodels.io/)** 💲 — Hosted Jev-compatible API for open-weight decision models, with an EU-only tier and a peer-to-peer tier that can run on independent GPU providers.

### Agents & Compound AI

- **[Parrot](https://arxiv.org/abs/2405.19888)** ⭐ 📄 — Introduces semantic variables that expose data flow between an application's LLM calls, so the serving layer can optimize the whole workflow end to end. <sub>OSDI 2024 · [code](https://github.com/microsoft/ParrotServe)</sub>
- **[Autellix (Agentix)](https://arxiv.org/abs/2502.13965)** 📄 — Schedules whole agent programs rather than single calls, preempting LLM calls by the history of their program to reduce head-of-line blocking. <sub>NSDI 2026</sub>
- **[Continuum](https://arxiv.org/abs/2511.02230)** 📄 — Pins a finished request's KV cache in GPU memory for a time-to-live based on expected tool-call duration, so multi-turn agents skip re-prefilling. <sub>ICLR 2026 · [code](https://github.com/Hanchenli/vllm-continuum)</sub>
- **[CacheWise](https://arxiv.org/abs/2606.16824)** 📄 — Analyzes real coding-agent traces and pairs prefix-aware scheduling with KV eviction guided by tool-call metadata, implemented in vLLM. <sub>arXiv 2026</sub>
- **[Agentic AI Workload Characteristics](https://arxiv.org/abs/2605.26297)** 📄 — Traces ReAct-style agents on Gemma and Qwen models and finds decode-dominated execution with long-lived KV state once context caching is on. <sub>IISWC 2026</sub>
- **[vLLM Tool Calling](https://docs.vllm.ai/en/latest/features/tool_calling/)** — Documents vLLM's auto tool choice flags, per-model tool-call parsers, and the plugin interface for writing a custom parser.
- **[SGLang Tool Parser](https://docs.sglang.io/docs/advanced_features/tool_parser)** — Maps SGLang's tool parsers to model families and covers forced tool choice, streaming, and adding a parser for a new function-call format.

### RL Rollouts & Post-Training

- **[verl](https://github.com/verl-project/verl)** ⭐ — RL post-training library from the HybridFlow paper that places actor, rollout, and reward workers on GPUs and plugs into FSDP, Megatron-LM, vLLM, or SGLang. <sub>Apache-2.0 · ★ 24k · updated 2026-10</sub>
- **[slime](https://github.com/THUDM/slime)** — RL scaling framework that links Megatron training to SGLang rollouts through a data buffer and customizable data-generation functions. <sub>Apache-2.0 · ★ 8.7k · updated 2026-10</sub>
- **[Miles](https://github.com/radixark/miles)** — Fork of slime for production post-training of large LLMs and VLMs on SGLang rollouts, with low-precision RL and on-policy distillation. <sub>Apache-2.0 · ★ 3.2k · updated 2026-10</sub>
- **[AReaL](https://github.com/areal-project/AReaL)** — Fully asynchronous RL system from Tsinghua and Ant Group that decouples generation from training, aimed at reasoning and agentic models. <sub>Apache-2.0 · ★ 5.9k · updated 2026-10</sub>
- **[SkyRL](https://github.com/NovaSky-AI/SkyRL)** — Full-stack RL library with a trainer, an agent layer, and a tool-use gym, plus a backend that implements the Tinker API on your own hardware. <sub>Apache-2.0 · ★ 2.5k · updated 2026-10</sub>
- **[prime-rl](https://github.com/PrimeIntellect-ai/prime-rl)** — Asynchronous RL framework using FSDP2 for training and vLLM for inference, with Slurm deployment and prefill-decode disaggregation for large MoE models. <sub>Apache-2.0 · ★ 2.2k · updated 2026-10</sub>
- **[NeMo RL](https://github.com/NVIDIA-NeMo/RL)** — NVIDIA post-training toolkit with GRPO and SFT recipes, vLLM generation, and delta-compressed weight refit between training and rollout clusters. <sub>Apache-2.0 · ★ 2.1k · updated 2026-10</sub>
- **[checkpoint-engine](https://github.com/MoonshotAI/checkpoint-engine)** — Middleware that updates weights in running inference engines in place, using broadcast or peer-to-peer transfer, for the refit step of RL loops. <sub>MIT · ★ 1k · updated 2026-10</sub>
- **[Tinker](https://thinkingmachines.ai/tinker/)** 💲 — Managed post-training service where your code drives the loop with sample, forward_backward, and optimizer calls while the provider runs the GPUs.
- **[SGLang for RL Systems](https://docs.sglang.io/docs/advanced_features/sglang_for_rl)** — Covers SGLang's rollout features for RL, including memory release and resume, pause and continue, weight-refit paths, and deterministic mode.
- **[vLLM RLHF Documentation](https://docs.vllm.ai/en/latest/training/rlhf/)** — Overview of vLLM's RL-facing features, from NCCL and IPC weight transfer and a weight checker to routed-experts return for MoE and async pause and resume.

### Robotics & Embodied AI

- **[openpi](https://github.com/Physical-Intelligence/openpi)** ⭐ 🧪 — Open pi-0, pi-0-FAST, and pi-0.5 vision-language-action models with base checkpoints, fine-tuning recipes, and a websocket policy server for remote inference. <sub>Apache-2.0 · ★ 14k · updated 2026-08</sub>
- **[LeRobot Asynchronous Inference](https://huggingface.co/docs/lerobot/async)** — Tutorial on decoupling action prediction from execution with a policy server and robot client, plus tuning of chunk size and the refill threshold.
- **[Isaac GR00T](https://github.com/NVIDIA/Isaac-GR00T)** — NVIDIA's open foundation model for generalist robots, with fine-tuning code and an ONNX and TensorRT deployment path for desktop GPUs and Jetson. <sub>Apache-2.0 · ★ 8.3k · updated 2026-10</sub>
- **[Real-Time Execution of Action Chunking Flow Policies](https://arxiv.org/abs/2506.07339)** 📄 — Computes the next action chunk while the current one executes and inpaints around committed actions, keeping motion smooth despite inference delay. <sub>NeurIPS 2025</sub>

### Diffusion Language Models

- **[Fast-dLLM](https://github.com/NVlabs/Fast-dLLM)** ⭐ — Acceleration techniques for diffusion LLMs, pairing a block-wise approximate KV cache with confidence-based parallel decoding, plus block-diffusion variants. <sub>Apache-2.0 · ★ 1.1k · updated 2026-05</sub>
- **[dInfer](https://github.com/inclusionAI/dInfer)** — Inference framework for diffusion LLMs that splits the pipeline into model, iteration manager, decoder, and KV-cache manager components. <sub>Apache-2.0 · ★ 488 · updated 2026-02</sub>
- **[DiffusionGemma in vLLM](https://vllm.ai/blog/2026-06-10-diffusion-gemma)** — Walks through adding a diffusion LLM to vLLM with the ModelState abstraction, covering the denoising loop, sampler, and attention changes.
- **[SGLang Day-0 Support for LLaDA 2.0](https://www.lmsys.org/blog/2025-12-19-diffusion-llm)** — Shows how SGLang reuses its chunked-prefill pipeline to batch diffusion blocks, with a pluggable decoding-algorithm layer between worker and model runner.
- **[SGLang Diffusion Language Models](https://docs.sglang.io/docs/supported-models/diffusion_language_models)** — Explains how to serve LLaDA2.0, SDAR, and DiffusionGemma in SGLang, with selectable decoding algorithms configured through YAML.

### Classical ML & RecSys

- **[TorchRec](https://github.com/meta-pytorch/torchrec)** ⭐ — PyTorch domain library with sharding and parallelism primitives for recommender models whose embedding tables span many GPUs, for training and inference. <sub>BSD-3-Clause · ★ 2.6k · updated 2026-10</sub>
- **[Triton FIL Backend](https://github.com/triton-inference-server/fil_backend)** — Triton backend that serves XGBoost, LightGBM, scikit-learn, and cuML tree ensembles with GPU or CPU forest inference. <sub>Apache-2.0 · ★ 94 · updated 2026-10</sub>
- **[Treelite](https://github.com/dmlc/treelite)** — Library and file format for decision-tree forests that lets C++ applications load, exchange, and persist models from several tree-training frameworks. <sub>Apache-2.0 · ★ 832 · updated 2026-10</sub>
- **[Generative Recommenders (HSTU)](https://github.com/meta-recsys/generative-recommenders)** — Reference code for HSTU and M-FALCON, which recast recommendation as sequence generation and speed up large sequential recommender training and inference. <sub>Apache-2.0 · ★ 2k · updated 2026-10</sub>
- **[NVIDIA RecSys Examples](https://github.com/NVIDIA/recsys-examples)** — NVIDIA's HSTU and semantic-ID recommender examples, including inference with a paged GPU KV cache, Triton Inference Server, and AOTInductor C++ deployment. <sub>BSD-3-Clause · ★ 355 · updated 2026-10</sub>

## Providers & Clouds

Commercial places to run inference. Listed for completeness and marked 💲; no paid placement or referral links.

### Model APIs & Serverless Inference

- **[Together AI](https://docs.together.ai/intro)** 💲 — Hosted API for open and partner models across chat, image, video, speech, and rerank, with dedicated model and container endpoints and post-training.
- **[Fireworks AI](https://docs.fireworks.ai/getting-started/introduction)** 💲 — Inference platform with serverless and dedicated deployments for open models, plus batch, fine-tuning, custom model upload, and reserved throughput.
- **[Baseten Model APIs](https://www.baseten.co/products/model-apis/)** 💲 — Hosted APIs for open models that run on the Baseten inference stack, alongside dedicated deployments of custom models on the same platform.
- **[DeepInfra](https://docs.deepinfra.com/)** 💲 — Pay-per-use API for open models covering chat, embeddings, reranking, image, and speech, with batch processing and private or LoRA-adapted deployments.
- **[Hugging Face Inference Providers](https://huggingface.co/docs/inference-providers/index)** 💲 — Router that reaches partner inference providers through one Hugging Face token and an OpenAI-compatible endpoint, with provider selection policies and failover.
- **[GroqCloud](https://console.groq.com/docs/overview)** — API for open models served on Groq hardware, with OpenAI-compatible endpoints, tool use, speech models, and batch and flex service tiers.
- **[Cerebras Inference](https://inference-docs.cerebras.ai/)** 💲 — Hosted API for open models on Cerebras wafer-scale systems, with OpenAI-compatible endpoints, Python and Node SDKs, and a dedicated inference option.
- **[SambaNova Cloud](https://docs.sambanova.ai/docs/en/get-started/overview)** — API for open models on SambaNova hardware, with OpenAI- and Anthropic-compatible endpoints, function calling, prompt caching, and vision and audio models.
- **[Nebius Token Factory](https://nebius.com/services/token-factory)** 💲 — Nebius inference service, formerly AI Studio, with serverless public endpoints, dedicated endpoints, custom model weights, and post-training.
- **[Cloudflare Workers AI](https://developers.cloudflare.com/workers-ai/)** — Serverless inference for open models on GPUs across Cloudflare's network, callable from Workers or the REST API, with batch requests and LoRA adapters.

### Serverless GPU Platforms

- **[Modal](https://modal.com/docs/guide)** — Python-first serverless platform that runs functions, web endpoints, and batch jobs in autoscaling GPU containers, with sandboxes and multi-node clusters.
- **[Runpod Serverless](https://docs.runpod.io/serverless/overview)** 💲 — Autoscaling GPU workers behind queue-based or load-balanced endpoints, deployed from handler functions, custom containers, or a vLLM worker.
- **[Replicate](https://replicate.com/docs)** 💲 — Platform for running models through an API and for deploying custom models packaged with Cog, with a public model catalog, deployments, and webhooks.
- **[Beam](https://docs.beam.cloud/v2/getting-started/introduction)** 💲 — Serverless platform driven by a Python SDK for GPU endpoints, async tasks, sandboxes, and virtual machines, with cold-start and warm-container controls.
- **[Cerebrium](https://cerebrium.ai/docs/getting-started/introduction)** — Serverless GPU platform for real-time workloads, with custom container images, autoscaling, REST and WebSocket endpoints, and multi-region deployment.
- **[fal Serverless](https://fal.ai/serverless)** 💲 — Serverless layer of fal's generative-media inference platform for deploying custom model workloads on autoscaling GPUs, next to its hosted model APIs.
- **[Hugging Face Inference Endpoints](https://huggingface.co/docs/inference-endpoints/index)** 💲 — Managed service that deploys Hub models to dedicated, autoscaling endpoints running vLLM, TGI, or a custom container, with logs and metrics.

### GPU Clouds

- **[CoreWeave](https://www.coreweave.com/products/gpu-compute)** 💲 — GPU cloud with NVIDIA instances and clusters, offered alongside a managed Kubernetes service, for AI training and inference workloads.
- **[Lambda](https://lambda.ai/instances)** 💲 — GPU cloud with on-demand NVIDIA instances, self-serve 1-Click Clusters, and larger reserved clusters, plus the Lambda Stack software bundle.
- **[Crusoe Cloud](https://www.crusoe.ai/cloud)** 💲 — GPU cloud offering NVIDIA and AMD instances, a managed inference service, and serverless fine-tuning on its own data center capacity.
- **[Nebius](https://nebius.com/)** 💲 — AI-focused cloud with non-virtualized GPU clusters on InfiniBand, self-service provisioning, and serverless and managed inference options.
- **[Vast.ai](https://vast.ai/)** 💲 — Marketplace where hosts list GPUs that users rent as instances, with a CLI and API and a serverless endpoint layer on the same inventory.
- **[Verda](https://verda.com/)** 💲 — AI cloud formerly known as DataCrunch, with GPU instances, self-service InfiniBand clusters, and serverless containers for inference and batch jobs.
- **[TensorWave](https://tensorwave.com/)** 💲 — Cloud built on AMD Instinct accelerators and ROCm, offering bare-metal access and inference services.

### Hyperscaler AI Platforms

- **[Amazon Bedrock](https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html)** 💲 — AWS managed service that serves foundation models from several providers through AWS APIs, including Converse and OpenAI-style endpoints.
- **[Amazon SageMaker AI Inference](https://aws.amazon.com/sagemaker/ai/deploy/)** 💲 — Managed hosting for custom and open models on AWS instances, with real-time, asynchronous, serverless, and batch inference options.
- **[Gemini Enterprise Agent Platform (formerly Vertex AI)](https://cloud.google.com/products/gemini-enterprise-agent-platform)** 💲 — Google Cloud platform for serving Gemini and other models and for building, tuning, and deploying agents and custom models; the successor to Vertex AI.
- **[Microsoft Foundry (formerly Azure AI Foundry)](https://learn.microsoft.com/en-us/azure/foundry/what-is-foundry)** 💲 — Azure platform for deploying models and agents, with a model catalog, tracing and monitoring, role-based access control, and unified networking policies.
- **[OCI Generative AI](https://docs.oracle.com/en-us/iaas/Content/generative-ai/home.htm)** 💲 — Oracle Cloud service for calling pretrained models or importing your own onto managed hosting, with routing profiles and guardrails.

### Aggregators & Marketplaces

- **[OpenRouter](https://openrouter.ai/docs/quickstart)** — Single API and credit balance that routes requests to models from many providers, with provider selection, fallbacks, and per-request data policies.
- **[Vercel AI Gateway](https://vercel.com/docs/ai-gateway)** 💲 — Hosted endpoint from Vercel that fronts models from many providers behind one key, with routing, fallbacks, and usage observability.
- **[Shadeform](https://shadeform.com/)** 💲 — GPU marketplace that provisions instances across many cloud providers from one console, with centralized billing and support.
- **[SF Compute](https://sfcompute.com/)** 💲 — GPU cloud offering VMs, bare metal, and managed Slurm, with a scheduler that lets tenants sell unused reserved capacity back to others.

### Decentralized Networks

- **[Targon](https://targon.com/)** 💲 — Bittensor subnet 4 GPU cloud with VMs and bare metal; confidential VMs pair Intel TDX with NVIDIA confidential computing and attestation-gated disk keys.
- **[Lium](https://docs.lium.io/intro)** 💲 — Bittensor subnet 51 marketplace for renting NVIDIA GPU pods over SSH from the web, CLI, SDK, or API; a validator checks each listed node every 15 minutes.
- **[Chutes](https://chutes.ai/docs)** 💲 — Bittensor subnet 64 serverless platform with an OpenAI-compatible API for open models and an SDK to deploy custom images; TEE variants run on Intel TDX.
- **[Akash Network](https://akash.network/docs/)** 💲 — Open compute marketplace where independent providers bid on container deployments described in SDL, plus AkashML, an OpenAI-compatible inference API.
- **[io.net](https://io.net/docs/guides/getting-started)** 💲 — Decentralized GPU network for renting containers, VMs, and Ray or Kubernetes clusters, plus IO Intelligence, a hosted model API.
- **[Nosana](https://learn.nosana.com/)** 💲 — Solana-based GPU marketplace that runs container jobs on community-hosted NVIDIA GPUs, plus an OpenAI-compatible LLM API billed per token.

## Case Studies & Engineering Blogs

How teams actually run inference at scale, written by the people who built it.

### Production Case Studies

- **[Disaggregated Prefill and Decode (Perplexity)](https://www.perplexity.ai/hub/blog/disaggregated-prefill-and-decode)** ⭐ — How Perplexity runs prefill and decode on separate nodes, with an RDMA KV-cache messenger, tensor-parallel layouts, and DeepSeek-R1 and Qwen3-Coder deployments.
- **[A Postmortem of Three Recent Issues (Anthropic)](https://www.anthropic.com/research/a-postmortem-of-three-recent-issues)** — Anthropic's 2025 account of three serving bugs, covering a routing error, a TPU misconfiguration, and an approximate top-k compiler miscompilation.
- **[Building the Foundation for Running Extra-Large Language Models (Cloudflare)](https://blog.cloudflare.com/high-performance-llms/)** — Cloudflare on running large open models in Workers AI with disaggregated prefill/decode, prompt caching, a shared KV cache, and speculative decoding.
- **[Cross-Request KV Cache Exposure in GLM-5.3 on Workers AI (Cloudflare)](https://blog.cloudflare.com/kv-cache-exposure-remediation/)** — Cloudflare's incident report on stale KV pages leaking across requests in a disaggregated SGLang deployment, with root cause and remediation.
- **[Scaling LLM Inference: Tensor, Context, and Expert Parallelism (Meta)](https://engineering.fb.com/2025/10/17/ai-research/scaling-llm-inference-innovations-tensor-parallelism-context-parallelism-expert-parallelism/)** — Meta engineers describe the parallelism techniques they use to cut latency for large-model inference, with measurements for long-context prefill.
- **[In-House LLM Serving at Netflix](https://netflixtechblog.com/in-house-llm-serving-at-netflix-a5a8e799ea2c)** — Netflix on serving LLMs with vLLM and Triton behind its Model Scoring Service, including version pinning, constrained decoding, and deployment strategies.
- **[Arctic Inference with Shift Parallelism (Snowflake)](https://www.snowflake.com/en/blog/engineering/arctic-inference-shift-parallelism/)** — Snowflake AI Research introduces a vLLM plugin whose Shift Parallelism switches between tensor and sequence parallelism by load, used in Cortex AI.
- **[How Amazon Scaled Rufus with Multi-Node Inference on Trainium and vLLM](https://aws.amazon.com/blogs/machine-learning/how-amazon-scaled-rufus-by-building-multi-node-inference-using-aws-trainium-chips-and-vllm/)** — Amazon engineers on serving the Rufus shopping assistant across Trainium nodes with vLLM, leader-follower orchestration, hybrid parallelism, and EFA networking.
- **[Better MoE Model Inference with Warp Decode (Cursor)](https://cursor.com/blog/warp-decode)** — Cursor's MoE decode kernel in which each warp computes one output value, with B200 measurements for a Qwen-style model on its internal inference system.
- **[Editing Files at 1000 Tokens per Second (Cursor)](https://cursor.com/blog/instant-apply)** — Cursor's 2024 write-up of speculative edits, a draft-model-free form of speculative decoding for rewriting files, run on a fine-tuned Llama-3-70b via Fireworks.
- **[How We Built Multi-Cloud Capacity Management (Baseten)](https://www.baseten.co/blog/how-we-built-multi-cloud-capacity-management/)** — Baseten's infrastructure team on a global scheduler that places inference replicas across clouds, with autoscaling, failover, and region constraints.

### Engineering Blogs

- **[vLLM Blog](https://vllm.ai/blog)** ⭐ — Release notes, performance write-ups, and new-model support posts from the vLLM project and its contributors.
- **[LMSYS Org Blog](https://www.lmsys.org/blog/)** — Posts from the LMSYS team on SGLang features, large-scale deployment recipes, and new hardware backends, alongside its other projects.
- **[SGLang Blog](https://www.sglang.io/blog)** — Releases, benchmark reports, and deep dives from the SGLang team, including day-0 model support and runtime topics such as memory management.
- **[PyTorch Blog](https://pytorch.org/blog/)** — PyTorch Foundation posts, including inference-relevant writing on ExecuTorch, vLLM, NVIDIA Dynamo, kernels, and accelerator support.
- **[NVIDIA Technical Blog (Inference Performance)](https://developer.nvidia.com/blog/tag/inference-performance/)** — NVIDIA developer posts on inference topics such as Dynamo, TensorRT, speculative decoding, and decoding for hybrid state-space models.
- **[Hugging Face Blog](https://huggingface.co/blog)** — Staff and community posts on open models and inference tooling, including serving libraries, quantization, and batching explainers.
- **[Together AI Blog](https://www.together.ai/blog)** — Product and research posts from Together AI on serving open models, with coverage of inference techniques and GPU cluster offerings.
- **[Fireworks AI Blog](https://fireworks.ai/blog)** — Posts from Fireworks AI on model releases, inference and training recipes, research notes, and customer deployments.
- **[Baseten Blog](https://www.baseten.co/blog/)** — Baseten posts on inference engineering, model performance, and infrastructure, plus product news and customer deployments.
- **[Modal Blog](https://modal.com/blog)** — Modal's posts on serving models on GPUs, container and storage infrastructure, and inference benchmarks for open-weights LLMs.
- **[Hazy Research Blog](https://hazyresearch.stanford.edu/blog)** — Stanford's Hazy Research posts on hardware-aware kernels, efficient architectures, and local AI, including the ThunderKittens releases.
- **[Thinking Machines Connectionism](https://thinkingmachines.ai/blog/)** — Research blog from Thinking Machines Lab with posts on deterministic inference, on-policy distillation, and LoRA training.
- **[Cloudflare Blog (Workers AI)](https://blog.cloudflare.com/tag/workers-ai/)** — Cloudflare posts tagged Workers AI, covering the engineering of serving open models on its network alongside product announcements.
- **[Perplexity Research](https://research.perplexity.ai/)** — Perplexity's research and systems posts, including its work on disaggregated prefill and decode, agents, and retrieval models.

## Learning Resources

Books, courses, learning paths, and long-form writing for going deeper.

### Books

- **[Programming Massively Parallel Processors (5th ed.)](https://shop.elsevier.com/books/programming-massively-parallel-processors/hwu/978-0-443-43900-1)** ⭐ 📖 💲 — Standard textbook on GPU programming, memory hierarchies, and parallel patterns; the 2026 edition adds LLM workloads.
- **[How to Scale Your Model](https://jax-ml.github.io/scaling-book/)** ⭐ 📖 — Full textbook behind the Start Here inference chapter, covering rooflines, TPU and GPU anatomy, sharding, and transformer math. <sub>MIT · ★ 1.5k · updated 2026-10</sub>
- **[Machine Learning Engineering Open Book](https://github.com/stas00/ml-engineering)** 📖 — Stas Bekman's field notes on accelerators, networking, storage, debugging, and inference for running large models on GPU clusters. <sub>CC-BY-SA-4.0 · ★ 20k · updated 2026-10</sub>
- **[AI Systems Performance Engineering (O'Reilly)](https://www.oreilly.com/library/view/ai-systems-performance/9798341627772/)** 📖 💲 — Profiling-first book on tuning GPUs, CUDA kernels, PyTorch, and multi-node systems for training and inference, closing with an optimization checklist.
- **[Hands-On LLM Serving and Optimization](https://www.oreilly.com/library/view/hands-on-llm-serving/9798341621480/)** 📖 💲 — O'Reilly book from 2026 on designing LLM serving systems, balancing latency against throughput, and hosting models cost-effectively at scale.
- **[The Ultra-Scale Playbook](https://huggingface.co/spaces/nanotron/ultrascale-playbook)** 📖 — Interactive Hugging Face book on data, tensor, pipeline, context, and expert parallelism on GPU clusters, with benchmarks for each strategy.
- **[AI Engineering](https://www.oreilly.com/library/view/ai-engineering/9781098166298/)** 📖 💲 — Chip Huyen's book on building applications on foundation models, with a chapter on inference optimization and serving trade-offs.
- **[Machine Learning Systems (Harvard CS249r)](https://mlsysbook.ai/)** 📖 — Open textbook from Harvard CS249r on the whole ML systems stack, including model compression, hardware acceleration, benchmarking, and operations. <sub>CC-BY-NC-ND-4.0 · ★ 30k · updated 2026-10</sub>
- **[Efficient Processing of Deep Neural Networks](https://link.springer.com/book/10.1007/978-3-031-01766-7)** 📖 💲 — MIT textbook by Sze, Chen, Yang, and Emer on dataflows, data reuse, and metrics for designing and comparing DNN accelerators.
- **[Efficient Deep Learning](https://efficientdlbook.com/)** 📖 — Free draft chapters by Menghani and Singh on compression, efficient architectures, and training techniques for smaller models, predating LLMs.

### Courses

- **[MIT 6.5940: TinyML and Efficient AI Computing](https://hanlab.mit.edu/courses/2026-fall-65940)** ⭐ 🎓 — Song Han's Fall 2026 course on pruning, quantization, distillation, and LLM deployment, with slides, videos, and labs posted for each lecture.
- **[CMU 15-442/642: Machine Learning Systems](https://mlsyscourse.org/)** 🎓 — Spring 2026 course by Tianqi Chen and Zhihao Jia on ML frameworks, GPU acceleration, memory and parallelism, and LLM serving case studies.
- **[CMU 11-868: Large Language Model Systems](https://llmsystem.github.io/llmsystem2026spring/)** 🎓 — Spring 2026 course that goes from CUDA basics and a MiniTorch homework track to FlashAttention, vLLM, SGLang, and disaggregated serving.
- **[Stanford CS336: Language Modeling from Scratch](https://cs336.stanford.edu/)** 🎓 — Students build a language model end to end, including Triton kernels, parallelism, scaling laws, and inference, with lectures on YouTube.
- **[GPU MODE Lectures](https://github.com/gpu-mode/lectures)** 🎓 — Slides and code for the community lecture series on CUDA, Triton, CUTLASS, profiling, and inference kernels; recordings are on YouTube. <sub>Apache-2.0 · ★ 6.9k · updated 2026-09</sub>
- **[UCSD CSE 234: Data Systems for Machine Learning](https://haoailab.com/cse234-w25/)** 🎓 — Hao Zhang's Winter 2025 course on ML frameworks, GPUs, parallelism, and LLM serving with paged attention, batching, and speculative decoding.
- **[MIT 6.S894: Accelerated Computing](https://accelerated-computing.academy/fall25/)** 🎓 — Fall 2025 graduate course on performance engineering for accelerators, with weekly CUDA labs that build toward fast GPU kernels.
- **[Stanford CS149: Parallel Computing](https://gfxcourses.stanford.edu/cs149/fall25)** 🎓 — Fall 2025 course on parallel architectures and programming, from SIMD and multicore CPUs to GPUs and domain-specific accelerators.

### Learning Paths

- **[ML Systems Onboarding Reading List](https://github.com/gpu-mode/awesomeMLSys)** — Annotated reading list from GPU MODE that says where to start on attention, serving optimizations, quantization, long context, and parallelism. <sub>★ 1.1k · updated 2026-02</sub>
- **[Triton Puzzles](https://github.com/gpu-mode/Triton-Puzzles)** 🎓 — Notebook puzzles that teach Triton from first principles, building from vector ops up to matmul and FlashAttention with a visual debugger. <sub>Apache-2.0 · ★ 2.7k · updated 2026-04</sub>
- **[Mojo GPU Puzzles](https://puzzles.modular.com/)** 🎓 — Progressive puzzles that teach GPU programming in Mojo, from threads and shared memory to warp-level code, tensor cores, and profiling. <sub>Apache-2.0 WITH LLVM-exception · ★ 431 · updated 2026-10</sub>
- **[NVIDIA Accelerated Computing Hub](https://github.com/NVIDIA/accelerated-computing-hub)** 🎓 — Open notebooks and syllabi from NVIDIA for CUDA C++, CUDA Python, and CUDA Tile, runnable on cloud GPUs or Colab. <sub>Apache-2.0 AND CC-BY-NC-SA-4.0 · ★ 2.1k · updated 2026-10</sub>

### Deep Dives & Essays

- **[How to Optimize a CUDA Matmul Kernel for cuBLAS-like Performance](https://siboehm.com/articles/22/CUDA-MMM)** ⭐ — Worklog that takes a naive SGEMM through coalescing, shared-memory tiling, and warptiling, profiling each step against cuBLAS.
- **[Large Transformer Model Inference Optimization](https://lilianweng.github.io/posts/2023-01-10-inference-optimization/)** ⭐ — Survey essay on distillation, quantization, pruning, sparsity, mixture of experts, and architecture changes that cut inference cost.
- **[Inside NVIDIA GPUs: Anatomy of High-Performance Matmul Kernels](https://www.aleksagordic.com/blog/matmul)** — Builds from GPU memory hierarchy and PTX/SASS up to Hopper matmul kernels that use TMA, wgmma, and warp specialization.
- **[Outperforming cuBLAS on H100: A Worklog](https://cudaforfun.substack.com/p/outperforming-cublas-on-h100-a-worklog)** — Hopper follow-up to the Boehm worklog that grows a dependency-free GEMM in one CUDA file, adding TMA, wgmma, and warp specialization step by step.
- **[tcgen05 for dummies](https://gau-nernst.github.io/tcgen05/)** — Plain CUDA C++ and PTX walkthrough of Blackwell's tcgen05 Tensor Core instructions, building a B200 matmul that approaches cuBLAS.
- **[CUTLASS Tutorial: Mastering the Tensor Memory Accelerator (TMA)](https://research.colfax-intl.com/tutorial-hopper-tma/)** — Explains Hopper's TMA unit for asynchronous bulk copies, including loads, stores, and multicast, and how to drive it through CuTe.
- **[CUTLASS Tutorial: Fast Matrix Multiplication with WGMMA on Hopper](https://research.colfax-intl.com/cutlass-tutorial-wgmma-hopper/)** — Shows how warpgroup-level wgmma instructions work on Hopper and how CUTLASS and CuTe expose them in a GEMM mainloop.
- **[Deep Dive on CUTLASS Ping-Pong GEMM Kernel](https://pytorch.org/blog/cutlass-ping-pong-gemm-kernel/)** — Walks through a warp-specialized Hopper FP8 GEMM in which producer and consumer warpgroups alternate so math overlaps with epilogues.
- **[GPUs Go Brrr](https://hazyresearch.stanford.edu/blog/2024-05-12-tk)** — Hazy Research essay on what keeps an H100 busy, from tensor cores and TMA to async pipelines, and the ThunderKittens design built on it.
- **[Optimizing Parallel Reduction in CUDA](https://developer.download.nvidia.com/assets/cuda/files/reduction.pdf)** — Classic NVIDIA slide deck that refines a sum-reduction kernel through seven versions, a template for reasoning about bandwidth limits.
- **[LLM Inference Performance Engineering: Best Practices](https://www.databricks.com/blog/llm-inference-performance-engineering-best-practices)** — Defines latency, throughput, and model bandwidth utilization, then measures how batch size, tensor parallelism, and quantization trade off.
- **[LLM Inference Speed of Light](https://zeux.io/2024/03/15/llm-inference-sol/)** — Derives the memory-bandwidth floor on per-token decode latency and checks how close a hand-written inference engine gets to it.
- **[How Continuous Batching Enables 23x Throughput in LLM Inference](https://www.anyscale.com/blog/continuous-batching-llm-inference)** — Explains why static batching wastes GPU time during decoding and benchmarks iteration-level scheduling across serving frameworks.
- **[Continuous Batching from First Principles](https://huggingface.co/blog/continuous_batching)** — Derives continuous batching step by step from attention and the KV cache, covering ragged batches and chunked prefill along the way.
- **[Flash-Decoding for Long-Context Inference](https://crfm.stanford.edu/2023/10/12/flashdecoding.html)** — Introduces splitting the KV sequence across thread blocks during decode and merging partial softmax results so small batches still fill the GPU.

<details>
<summary>Show 6 more</summary>

- **[Accelerating Generative AI with PyTorch II: GPT, Fast](https://pytorch.org/blog/accelerating-generative-ai-2/)** — Shows how far plain PyTorch goes for LLM decoding with torch.compile, int8 and int4 weights, speculative decoding, and tensor parallelism.
- **[Fast LLM Inference From Scratch](https://andrewkchan.dev/posts/yalm.html)** — Builds a single-GPU inference engine in C++ and CUDA without libraries, profiling each step from a naive CPU loop to fused kernels.
- **[vLLM V1: A Major Upgrade to vLLM's Core Architecture](https://vllm.ai/blog/2025-01-27-v1-alpha-release)** — Design notes on vLLM's rewritten core, covering the unified scheduler, a separate engine-core process, prefix caching, and piecewise CUDA graphs.
- **[Optimizing AI Inference at Character.AI](https://blog.character.ai/optimizing-ai-inference-at-character-ai/)** — Shows how multi-query attention, hybrid local-global layers, cross-layer KV sharing, and int8 shrink KV memory for long conversations.
- **[DeepSeek-V3/R1 Inference System Overview](https://github.com/deepseek-ai/open-infra-index/blob/main/202502OpenSourceWeek/day_6_one_more_thing_deepseekV3R1_inference_system_overview.md)** — First-hand account of serving V3/R1 with cross-node expert parallelism, a prefill-decode split, compute-communication overlap, and load balancing. <sub>CC0-1.0 · ★ 8.1k · updated 2025-05</sub>
- **[Deploying DeepSeek with PD Disaggregation and Large-Scale Expert Parallelism](https://www.lmsys.org/blog/2025-05-05-large-scale-ep/)** — Reproduces DeepSeek-style serving in SGLang on 96 H100s by combining prefill-decode disaggregation, DeepEP, two-batch overlap, and EPLB.

</details>

### Talks & Videos

- **[Why Inference Matters 12x More Than Training (YC Paper Club)](https://www.youtube.com/watch?v=mHNKuH-9OxU)** ⭐ — Engineers from Together AI, Ollama, Luminal, and SGLang trace a token through routing, caching, scheduling, kernels, and hardware.
- **[GPU MODE (YouTube)](https://www.youtube.com/@GPUMODE)** ⭐ — Recorded community lectures on CUDA, Triton, CUTLASS, profiling, and inference kernels, often given by the people who wrote them.
- **[The Inference Engineering Masterclass (Latent Space)](https://latent.space/p/inference-eng)** — Podcast episode with Baseten's Philip Kiely and Ali Taha on the practice of inference engineering for autoregressive and diffusion models.
- **[vLLM Office Hours](https://vllm.ai/office-hours)** — Biweekly livestream from the vLLM team with release updates and guest deep dives; past sessions are archived with recordings and slides.
- **[SGLang Learning Materials](https://github.com/sgl-project/sgl-learning-materials)** — Official collection of SGLang slide decks, blog links, and talk recordings from meetups, conferences, and vendor tech briefings. <sub>MIT · ★ 898 · updated 2026-01</sub>
- **[AI Performance Engineering (YouTube)](https://www.youtube.com/@AIPerformanceEngineering)** — Recordings of Chris Fregly's monthly meetup, with practitioner talks on GPU profiling, low-precision formats, disaggregated serving, and accelerators.
- **[Multi-GPU Kernels, Intelligence per Watt, and Heterogeneous Inference (YC Paper Club)](https://www.youtube.com/watch?v=n8dz2FX0_uY)** — Talks on Parallel Kittens multi-GPU kernels, intelligence per watt for local inference, AI-written kernels, and heterogeneous serving.
- **[Inference, Diffusion, World Models, and More (YC Paper Club)](https://www.youtube.com/watch?v=wE1ZgJdt4uM)** — Opens with a talk on Speculative Speculative Decoding (arXiv 2603.03251), followed by papers on diffusion control and world models.

### Communities & Newsletters

- **[GPU MODE Discord](https://discord.gg/gpumode)** ⭐ — Open Discord server for GPU programming with channels per kernel language and vendor, reading groups, lectures, and kernel competitions.
- **[vLLM Forums](https://discuss.vllm.ai/)** — Official discussion board for vLLM deployment, performance, and hardware-backend questions; real-time developer chat happens on the project Slack.
- **[SGLang Slack](https://slack.sglang.io/)** — Community workspace linked from the SGLang README where maintainers and users discuss deployments, kernels, and upcoming features.
- **[r/LocalLLaMA](https://www.reddit.com/r/LocalLLaMA/)** — Subreddit for running open-weight models on your own hardware, with frequent comparisons of quantizations, runtimes, and multi-GPU builds.
- **[AI Performance Engineering Meetup](https://www.meetup.com/ai-performance-engineering/)** — Monthly meetup run by Chris Fregly, with chapters in many cities and livestreamed talks on GPU performance, inference, and AI systems tuning.
- **[PyTorch Developer Discussions](https://dev-discuss.pytorch.org/)** — Forum where PyTorch core developers post design notes and updates on torch.compile, Inductor, export, and distributed internals.
- **[Latent Space](https://latent.space/)** — AI engineering newsletter and podcast with recurring interviews on inference providers, serving stacks, and GPU economics.

### Conferences & Venues

- **[MLSys](https://mlsys.org/)** ⭐ — Annual conference on machine learning and systems, where serving, kernel, and quantization papers such as FlashInfer, AWQ, and XGrammar appeared.
- **[OSDI](https://www.usenix.org/conferences/byname/179)** ⭐ — USENIX symposium on operating systems design that published Orca, DistServe, Sarathi-Serve, and other LLM serving systems.
- **[SOSP](https://sosp.org/)** — ACM symposium on operating systems principles, annual since 2023, where PagedAttention and vLLM were first published.
- **[NSDI](https://www.usenix.org/conferences/byname/178)** — USENIX symposium on networked systems, covering cluster scheduling, collective communication, and datacenter-scale serving.
- **[EuroSys](https://2027.eurosys.org/)** — European ACM SIGOPS systems conference with a growing share of LLM serving, scheduling, and KV cache papers; the link points to the 2027 edition.
- **[ASPLOS](https://www.asplos-conference.org/)** — Conference spanning computer architecture, compilers, and operating systems, a frequent home for accelerator and ML compiler work.
- **[Hot Chips](https://www.hotchips.org/)** — Annual symposium at Stanford where vendors present new GPUs, accelerators, and interconnects at the level of architecture detail.
- **[NVIDIA GTC](https://www.nvidia.com/gtc/)** — NVIDIA's developer conference; most sessions, including CUDA and inference talks, are later free to stream on NVIDIA On-Demand.
- **[PyTorch Conference](https://events.linuxfoundation.org/pytorch-conference-north-america/)** — Linux Foundation conference for the PyTorch ecosystem, with sessions on compilers, kernels, and inference engines such as vLLM and SGLang.
- **[vLLM Conference](https://vllm.ai/events/vllm-conference/2026)** — First vLLM conference, held with Ray Summit in San Francisco in August 2026, on the roadmap, hardware backends, and production inference.

## Contributing

Suggestions are welcome. This README is generated: add or edit entries in the YAML files under `data/` and run `pnpm build`. See [CONTRIBUTING.md](CONTRIBUTING.md) for the inclusion criteria and style guide.

## License

List content (everything in `data/` and this README) is dedicated to the public domain under [CC0 1.0](LICENSE). Scripts and site code are [MIT](LICENSE-CODE) licensed.
