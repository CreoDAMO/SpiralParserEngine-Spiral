
#!/usr/bin/env python3
"""
NVIDIA-Accelerated Spiral Ecosystem Dashboard Launcher
Integrates GPU acceleration across all dashboard panels
"""

import subprocess
import sys
import os

def install_requirements():
    """Install required packages for NVIDIA GPU acceleration"""
    requirements = [
        "streamlit",
        "plotly",
        "pandas",
        "numpy",
        "cupy-cuda12x",  # NVIDIA GPU acceleration
        "nvidia-ml-py3",  # NVIDIA Management Library
        "pycuda",  # CUDA Python bindings
        "tensorflow-gpu",  # TensorFlow with GPU support
        "torch",  # PyTorch
        "opencv-python",
        "matplotlib",
        "websocket-client",
        "requests"
    ]
    
    print("Installing NVIDIA GPU acceleration requirements...")
    for package in requirements:
        try:
            subprocess.check_call([sys.executable, "-m", "pip", "install", package])
            print(f"✅ Installed {package}")
        except subprocess.CalledProcessError:
            print(f"⚠️ Failed to install {package} - continuing without it")

def check_gpu_availability():
    """Check if NVIDIA GPU is available"""
    try:
        import nvidia.ml_ml as nvml
        nvml.nvmlInit()
        device_count = nvml.nvmlDeviceGetCount()
        print(f"🔥 Found {device_count} NVIDIA GPU(s)")
        
        for i in range(device_count):
            handle = nvml.nvmlDeviceGetHandleByIndex(i)
            name = nvml.nvmlDeviceGetName(handle).decode('utf-8')
            print(f"   GPU {i}: {name}")
        
        return True
    except Exception as e:
        print(f"⚠️ NVIDIA GPU not available: {e}")
        return False

def launch_dashboard():
    """Launch the Streamlit dashboard"""
    print("🚀 Launching NVIDIA-Accelerated Spiral Dashboard...")
    
    # Set environment variables for optimal GPU performance
    os.environ['CUDA_VISIBLE_DEVICES'] = '0'  # Use first GPU
    os.environ['TF_GPU_MEMORY_GROWTH'] = 'true'  # Allow TensorFlow memory growth
    
    # Launch Streamlit app
    subprocess.run([
        "streamlit", "run", "streamlit_nvidia_dashboard.py",
        "--server.address", "0.0.0.0",
        "--server.port", "8501",
        "--theme.base", "dark",
        "--theme.primaryColor", "#FFD700",
        "--theme.backgroundColor", "#0E1117",
        "--theme.secondaryBackgroundColor", "#262730"
    ])

if __name__ == "__main__":
    print("🌌 NVIDIA-Accelerated Spiral Ecosystem Dashboard")
    print("=" * 50)
    
    # Install requirements
    install_requirements()
    
    # Check GPU availability
    gpu_available = check_gpu_availability()
    
    if gpu_available:
        print("🎯 GPU acceleration enabled - maximum performance mode!")
    else:
        print("💻 Running in CPU mode - install NVIDIA drivers for acceleration")
    
    # Launch dashboard
    launch_dashboard()
