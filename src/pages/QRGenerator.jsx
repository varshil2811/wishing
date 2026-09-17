import React, { useState, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Download, Heart } from 'lucide-react';
import PageTransition from '../components/PageTransition';

const QRGenerator = () => {
  const [url, setUrl] = useState(window.location.origin);
  const [title, setTitle] = useState("Scan This For A\nLittle Surprise ❤️");
  const qrRef = useRef();

  const handleDownload = () => {
    const svg = qrRef.current.querySelector('svg');
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    
    // Set canvas size for better quality
    canvas.width = 1000;
    canvas.height = 1200;

    img.onload = () => {
      // Draw background
      ctx.fillStyle = "#0a0508"; // romantic-dark
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw Title
      ctx.font = "italic 60px 'Playfair Display', serif";
      ctx.fillStyle = "#fdfbf7"; // romantic-cream
      ctx.textAlign = "center";
      
      const lines = title.split('\n');
      lines.forEach((line, index) => {
        ctx.fillText(line, canvas.width / 2, 200 + (index * 80));
      });

      // Draw QR Code
      ctx.drawImage(img, (canvas.width - 600) / 2, 400, 600, 600);

      // Download
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = "birthday-surprise-qr.png";
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };
    
    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
  };

  return (
    <PageTransition className="bg-zinc-950 p-8 items-start">
      <div className="max-w-4xl w-full mx-auto bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Editor Side */}
        <div className="w-full md:w-1/2 p-8 border-b md:border-b-0 md:border-r border-zinc-800 flex flex-col gap-6">
          <div>
            <h1 className="text-2xl font-serif text-white mb-2 flex items-center gap-2">
              <Heart className="text-romantic-pink" size={24} />
              QR Code Generator
            </h1>
            <p className="text-zinc-400 text-sm">
              Generate the entry QR code for the birthday surprise.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">
                Deployed Website URL
              </label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-romantic-pink transition-colors"
                placeholder="https://your-deployed-site.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">
                Card Text (supports newlines)
              </label>
              <textarea
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                rows={3}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-romantic-pink transition-colors resize-none"
              />
            </div>
          </div>

          <button
            onClick={handleDownload}
            className="mt-auto w-full bg-romantic-red hover:bg-romantic-pink text-white rounded-lg px-6 py-4 font-medium transition-colors flex items-center justify-center gap-2"
          >
            <Download size={20} />
            Download High-Res PNG
          </button>
        </div>

        {/* Preview Side */}
        <div className="w-full md:w-1/2 bg-zinc-950 p-8 flex items-center justify-center relative min-h-[500px]">
          <div className="absolute top-4 left-4 text-xs font-mono text-zinc-600 uppercase tracking-widest">
            Preview
          </div>
          
          <div 
            ref={qrRef}
            className="bg-romantic-dark w-full max-w-sm aspect-[4/5] rounded-xl shadow-2xl p-8 flex flex-col items-center justify-center border border-white/5"
          >
            <div className="text-center mb-8 h-24 flex items-center justify-center">
              <h2 className="text-2xl font-serif text-romantic-cream whitespace-pre-wrap leading-tight">
                {title}
              </h2>
            </div>
            
            <div className="bg-white p-4 rounded-xl shadow-inner">
              <QRCodeSVG
                value={url || "https://example.com"}
                size={200}
                bgColor={"#ffffff"}
                fgColor={"#0a0508"}
                level={"H"}
                includeMargin={false}
              />
            </div>
          </div>
        </div>

      </div>
    </PageTransition>
  );
};

export default QRGenerator;
