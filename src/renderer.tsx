import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(({ children }) => {
  return (
    <html lang="ar">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>د. أحمد محمد الشريف | Dr. Ahmed Mohammed Al-Shareef</title>
        <meta name="description" content="استشاري جراحة عامة ومناظير - Consultant General & Laparoscopic Surgeon" />
        
        {/* Tailwind CSS CDN */}
        <script src="https://cdn.tailwindcss.com"></script>
        
        {/* Font Awesome Icons */}
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
        
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        
        {/* Custom Styles */}
        <link href="/static/style.css" rel="stylesheet" />
        
        <style dangerouslySetInnerHTML={{
          __html: `
            * {
              font-family: 'IBM Plex Sans Arabic', 'Inter', sans-serif;
            }
            
            [dir="rtl"] {
              direction: rtl;
              text-align: right;
            }
            
            [dir="ltr"] {
              direction: ltr;
              text-align: left;
            }
          `
        }} />
      </head>
      <body class="antialiased">
        {children}
      </body>
    </html>
  )
})
