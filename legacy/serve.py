#!/usr/bin/env python3
"""Servidor de desarrollo: igual que http.server pero sin caché,
para que los cambios en CSS/JS se vean al recargar.

    python3 tools/serve.py [puerto]
"""
import http.server, socketserver, os, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *a, **kw):
        super().__init__(*a, directory=ROOT, **kw)
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, max-age=0')
        super().end_headers()
    def log_message(self, fmt, *args):
        if '304' not in fmt % args:
            super().log_message(fmt, *args)

if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 4321
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(('', port), Handler) as srv:
        print(f'Sirviendo {ROOT} en http://localhost:{port}')
        srv.serve_forever()
