"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

interface SignatureCanvasProps {
  onSignatureChange: (signatureData: string) => void;
  onClose: () => void;
}

const SignatureCanvas = ({
  onSignatureChange,
  onClose,
}: SignatureCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Set white background
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#000000";
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const handleSign = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      onSignatureChange(canvas.toDataURL());
      onClose();
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-stone-600">Please sign below</p>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        className="w-full border-2 border-stone-300 rounded-md cursor-crosshair bg-white"
        style={{ height: "200px" }}
      />
      <div className="flex gap-2">
        <button
          onClick={clearSignature}
          className="text-sm text-stone-600 hover:text-stone-800 underline"
        >
          Clear
        </button>
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSign}>Sign</Button>
      </div>
    </div>
  );
};

export default SignatureCanvas;
