document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('startScanner');
    const statusSpan = document.getElementById('scannerStatus');
    const scannerFrame = document.getElementById('scannerFrame');

    // Set initial state
    startButton.textContent = 'Coming Soon';
    startButton.disabled = true;
    statusSpan.textContent = 'Feature not available';
    statusSpan.style.color = '#ffffff';
    
    if (scannerFrame) {
        scannerFrame.style.display = 'none';
    }
});
            command: 'forceInteraction',
            value: true
        }, '*');
    }

    startButton.addEventListener('click', function() {
        if (!isPlaying) {
            // Start scanner
            setupAudio();
            scannerFrame.style.visibility = 'visible';
            scannerFrame.style.width = '1px';
            scannerFrame.style.height = '1px';
            scannerFrame.style.opacity = '0.01'; // Need minimal opacity for some browsers
            
            // Simulate click at position 50,50 (where Zello unmute usually is)
            const clickEvent = new MouseEvent('click', {
                bubbles: true,
                clientX: 50,
                clientY: 50
            });
            scannerFrame.contentWindow.document.elementFromPoint(50, 50)?.dispatchEvent(clickEvent);
            
            startButton.textContent = 'Stop Listening';
            statusSpan.textContent = 'Online';
            statusSpan.style.color = '#4CAF50';
            isPlaying = true;
        } else {
            // Stop scanner
            scannerFrame.style.visibility = 'hidden';
            startButton.textContent = 'Start Listening';
            statusSpan.textContent = 'Offline';
            statusSpan.style.color = '#ffffff';
            isPlaying = false;
        }
    });

    // Handle messages from iframe
    window.addEventListener('message', function(event) {
        if (event.data === 'ready') {
            // Try to unmute when frame is ready
            scannerFrame.contentWindow.postMessage('unmute', '*');
        }
    });

    // Add click handler to help with autoplay/unmute
    scannerFrame.addEventListener('click', function() {
        scannerFrame.contentWindow.postMessage('unmute', '*');
    });
});
