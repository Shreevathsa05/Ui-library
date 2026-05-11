import React, { useState, useRef } from 'react';

export default function SmartFileDrop({
    multiple = false,
    onChange,
    containerClassName = "",
}) {
    const [isDragging, setIsDragging] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const fileInputRef = useRef(null);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            if (onChange) {
                onChange(multiple ? Array.from(e.dataTransfer.files) : [e.dataTransfer.files[0]]);
            }
        }
    };

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            if (onChange) {
                onChange(multiple ? Array.from(e.target.files) : [e.target.files[0]]);
            }
        }
    };

    return (
        <>
            <style>
                {`
          .smart-file-drop-container {
            width: 100%;
            padding: 16px;
            background: #ffffff;
            border-radius: 24px;
            box-shadow: 0 10px 40px -10px rgba(0,0,0,0.08);
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            box-sizing: border-box;
          }

          .smart-file-drop-container:hover {
            box-shadow: 0 20px 40px -10px rgba(0,0,0,0.12);
            transform: translateY(-2px);
          }

          .smart-file-drop-zone {
            position: relative;
            border: 2px dashed #cbd5e1;
            border-radius: 16px;
            padding: 48px 24px;
            text-align: center;
            cursor: pointer;
            background-color: #f8fafc;
            transition: all 0.3s ease;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 280px;
            overflow: hidden;
          }

          /* Hover State */
          .smart-file-drop-zone:hover {
            border-color: #6366f1;
            background-color: #eef2ff;
          }

          .smart-file-drop-zone:hover .upload-icon {
            transform: translateY(-5px) scale(1.05);
            color: #4f46e5;
          }

          /* Dragging State */
          .smart-file-drop-zone.dragging {
            border-color: #4f46e5;
            background-color: #e0e7ff;
            border-style: solid;
            transform: scale(0.98);
            box-shadow: inset 0 0 20px rgba(79, 70, 229, 0.2);
          }

          .smart-file-drop-zone.dragging .upload-icon {
            animation: bounce 1s infinite;
            color: #4338ca;
          }

          /* Animated dashed border effect using SVG background */
          .smart-file-drop-zone::before {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            border-radius: 16px;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.3s ease;
          }

          .upload-icon {
            width: 64px;
            height: 64px;
            color: #94a3b8;
            margin-bottom: 24px;
            transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
            filter: drop-shadow(0 4px 6px rgba(0,0,0,0.05));
          }

          .smart-file-drop-title {
            font-size: 28px;
            font-weight: 800;
            color: #1e293b;
            margin: 0 0 12px 0;
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            letter-spacing: -0.5px;
            transition: color 0.3s ease;
          }

          .smart-file-drop-zone:hover .smart-file-drop-title {
            color: #312e81;
          }

          .smart-file-drop-subtitle {
            font-size: 16px;
            color: #64748b;
            margin: 0 0 8px 0;
            font-weight: 500;
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
          }

          .smart-file-drop-action {
            display: inline-block;
            margin-top: 16px;
            padding: 10px 24px;
            background: #ffffff;
            color: #4f46e5;
            font-weight: 600;
            border-radius: 999px;
            font-size: 15px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.05);
            transition: all 0.3s ease;
            border: 1px solid #eef2ff;
          }

          .smart-file-drop-zone:hover .smart-file-drop-action {
            background: #4f46e5;
            color: #ffffff;
            box-shadow: 0 4px 15px rgba(79, 70, 229, 0.3);
            transform: translateY(-2px);
          }

          /* Animations */
          @keyframes bounce {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-15px);
            }
          }

          @keyframes pulse-ring {
            0% {
              transform: scale(0.8);
              opacity: 0.5;
            }
            100% {
              transform: scale(1.3);
              opacity: 0;
            }
          }

          .icon-wrapper {
            position: relative;
          }

          .smart-file-drop-zone.dragging .icon-wrapper::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 80px;
            height: 80px;
            background: #4f46e5;
            border-radius: 50%;
            transform: translate(-50%, -50%);
            z-index: -1;
            animation: pulse-ring 1.5s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
          }
        `}
            </style>

            <div className={`smart-file-drop-container ${containerClassName}`}>
                <div
                    className={`smart-file-drop-zone ${isDragging ? 'dragging' : ''}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={handleClick}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        multiple={multiple}
                        onChange={handleFileChange}
                    />

                    <div className="icon-wrapper">
                        <svg
                            className="upload-icon"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                        </svg>
                    </div>

                    <h2 className="smart-file-drop-title">Upload Files</h2>
                    <p className="smart-file-drop-subtitle">
                        Drag and Drop file{multiple ? 's' : ''} here
                    </p>
                    <span className="smart-file-drop-action">
                        Browse Files
                    </span>
                </div>
            </div>
        </>
    );
}
