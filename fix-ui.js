const fs = require('fs');

// Fix page.tsx spacing and background
let pageContent = fs.readFileSync('c:/Programming/New folder (2)/omarandpartners/app/page.tsx', 'utf-8');

pageContent = pageContent.replace(/py-24 md:py-32/g, 'py-32 md:py-48');
pageContent = pageContent.replace(/py-24/g, 'py-32 md:py-48');
pageContent = pageContent.replace('pt-24 pb-12', 'pt-32 md:pt-48 pb-24 md:pb-32');

const gridBg = `{/* Futuristic Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] z-0" />`;

const premiumBg = `{/* Premium Cinematic Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[1000px] md:h-[1000px] bg-primary/15 rounded-full blur-[120px] mix-blend-normal pointer-events-none z-0 animate-pulse" />`;

pageContent = pageContent.replace(gridBg, premiumBg);

fs.writeFileSync('c:/Programming/New folder (2)/omarandpartners/app/page.tsx', pageContent);

// Fix ecosystem diagram aspect ratio mismatch
let ecoContent = fs.readFileSync('c:/Programming/New folder (2)/omarandpartners/components/features/landing/ecosystem-diagram.tsx', 'utf-8');
ecoContent = ecoContent.replace('aspect-square md:aspect-[16/9] flex', 'aspect-square max-w-3xl flex');
ecoContent = ecoContent.replace('py-24', 'py-12 md:py-24');
fs.writeFileSync('c:/Programming/New folder (2)/omarandpartners/components/features/landing/ecosystem-diagram.tsx', ecoContent);

console.log('Fixes applied successfully.');
