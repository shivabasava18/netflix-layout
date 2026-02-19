#!/usr/bin/env python3
import http.server
import socketserver
import os

# Set the port
PORT = 8001

# Change to the current directory
os.chdir(os.path.dirname(os.path.abspath(__file__)))

# Create a custom request handler
class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add CORS headers to allow all requests
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

# Create the server
with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
    print(f"Netflix Authentication System Server")
    print(f"Server running at: http://localhost:{PORT}")
    print(f"Login Page: http://localhost:{PORT}/login.html")
    print(f"Register Page: http://localhost:{PORT}/register.html")
    print(f"Netflix Home: http://localhost:{PORT}/netflix.html")
    print(f"Press Ctrl+C to stop the server")
    print("-" * 50)
    
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped by user")
        httpd.shutdown()
