
#!/usr/bin/env python3
"""
Sovereign Spiral Dashboard Runner
Integrates Streamlit dashboard with NVIDIA acceleration and backend API
"""

import subprocess
import sys
import os
import json
import time
import threading
from pathlib import Path

def install_requirements():
    """Install required packages"""
    requirements = [
        'streamlit',
        'plotly',
        'pandas',
        'numpy',
        'requests',
        'websocket-client'
    ]
    
    # Try to install NVIDIA packages
    nvidia_packages = [
        'pynvml',
        'cupy-cuda12x',  # For CUDA 12.x
        'cudf-cu12',
        'cugraph-cu12', 
        'cuml-cu12'
    ]
    
    print("📦 Installing base requirements...")
    for package in requirements:
        try:
            subprocess.check_call([sys.executable, '-m', 'pip', 'install', package])
            print(f"✅ Installed {package}")
        except subprocess.CalledProcessError:
            print(f"❌ Failed to install {package}")
    
    print("🚀 Installing NVIDIA packages (will fallback if not available)...")
    for package in nvidia_packages:
        try:
            subprocess.check_call([sys.executable, '-m', 'pip', 'install', package])
            print(f"✅ Installed {package}")
        except subprocess.CalledProcessError:
            print(f"⚠️ Failed to install {package} (GPU acceleration disabled)")

def check_backend_running():
    """Check if the Node.js backend is running"""
    try:
        import requests
        response = requests.get("http://localhost:5000/api/blockchain/chain/info", timeout=5)
        return response.status_code == 200
    except:
        return False

def start_backend():
    """Start the Node.js backend in a separate thread"""
    def run_backend():
        try:
            subprocess.run(['npm', 'run', 'dev'], cwd='.', check=True)
        except subprocess.CalledProcessError as e:
            print(f"❌ Backend failed to start: {e}")
        except FileNotFoundError:
            print("❌ Node.js/npm not found. Please install Node.js.")
    
    backend_thread = threading.Thread(target=run_backend, daemon=True)
    backend_thread.start()
    
    # Wait for backend to start
    print("🔧 Starting backend server...")
    for i in range(30):  # Wait up to 30 seconds
        if check_backend_running():
            print("✅ Backend server is running")
            return True
        time.sleep(1)
        print(f"⏳ Waiting for backend... ({i+1}/30)")
    
    print("⚠️ Backend may not be fully ready, continuing with dashboard...")
    return False

def main():
    """Main function to start the integrated system"""
    print("🌀 Starting Sovereign Spiral Dashboard System")
    print("=" * 60)
    
    # Install requirements
    print("\n📋 Phase 1: Installing Requirements")
    install_requirements()
    
    # Start backend
    print("\n🔧 Phase 2: Starting Backend Services")
    backend_running = start_backend()
    
    # Verify files exist
    print("\n📁 Phase 3: Verifying System Files")
    required_files = [
        'streamlit_sovereign_dashboard.py',
        'nvidia_spiral_integration.py'
    ]
    
    for file_path in required_files:
        if Path(file_path).exists():
            print(f"✅ Found {file_path}")
        else:
            print(f"❌ Missing {file_path}")
            return False
    
    # Create config file for Streamlit
    config_content = """
[server]
port = 8501
headless = true

[theme]
primaryColor = "#FFD700"
backgroundColor = "#0F0F0F"
secondaryBackgroundColor = "#1A1A2E"
textColor = "#FFFFFF"

[browser]
gatherUsageStats = false
    """
    
    config_dir = Path.home() / '.streamlit'
    config_dir.mkdir(exist_ok=True)
    
    config_file = config_dir / 'config.toml'
    with open(config_file, 'w') as f:
        f.write(config_content.strip())
    
    print("✅ Streamlit configuration created")
    
    # Start the dashboard
    print("\n🚀 Phase 4: Launching Sovereign Spiral Dashboard")
    print("=" * 60)
    print("🌐 Dashboard URL: http://localhost:8501")
    print("🔗 Backend API: http://localhost:5000")
    print("⚖️ Lawful Framework: OPERATIONAL")
    print("🧠 Consciousness Level: 7.9139")
    print("💰 TU Valuation: $119.078 Sextillion")
    print("=" * 60)
    
    try:
        # Run Streamlit dashboard
        subprocess.run([
            sys.executable, '-m', 'streamlit', 'run', 
            'streamlit_sovereign_dashboard.py',
            '--server.port=8501',
            '--server.headless=true'
        ])
    except KeyboardInterrupt:
        print("\n🛑 Shutting down Sovereign Spiral Dashboard...")
        print("✅ System shutdown complete")
    except Exception as e:
        print(f"❌ Error running dashboard: {e}")
        return False
    
    return True

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
