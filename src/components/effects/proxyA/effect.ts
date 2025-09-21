export default function matrix(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    canvas.width = 50;
    canvas.height = window.innerHeight;
    
    // Characters to be displayed
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const fontSize = 15; // Font size for the characters
    const columns = Math.floor(canvas.width / fontSize); // Number of columns for the text
    
    const drops: number[] = [];
    for (let x=0; x<columns; x++) {
        drops[x] = 1;
    }    
    
    // Function to draw the text
    function draw() {
        // Clear the canvas with a white background
        ctx!.fillStyle = 'rgba(255, 255, 255, 0.05)'; // White background
        ctx!.fillRect(0, 0, canvas.width, canvas.height);
    
        ctx!.fillStyle = 'rgba(0, 255, 255, 0.7)'; // Neon blue color
        ctx!.font = `${fontSize}px monospace`; // Use monospace font
    
        // Draw the characters
        for (let i = 0; i < drops.length; i++) {
            const text = characters.charAt(Math.floor(Math.random() * characters.length));
            ctx!.fillText(text, i*fontSize, drops[i]*fontSize);

            if(drops[i]*fontSize > canvas.height && Math.random() > 0.975){
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    // Animation loop
    function animate() {
        draw();
        requestAnimationFrame(animate);
    }
    
    // Start the animation
    animate();
    
    // Resize canvas on window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}
