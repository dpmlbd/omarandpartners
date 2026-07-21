const fs = require('fs');
const path = require('path');

const projectRoot = 'c:/Programming/New folder (2)/omarandpartners';
const appDir = path.join(projectRoot, 'app');

const routes = [
  'about/company-overview',
  'about/leadership',
  'about/mission-vision',
  'about/core-values',
  'about/timeline',
  'about/awards-certifications',
  'about/partners',

  'kolpokowsol/overview',
  'kolpokowsol/services',
  'kolpokowsol/projects',
  'kolpokowsol/projects/[id]',
  'kolpokowsol/gallery',
  'kolpokowsol/team',
  'kolpokowsol/insights',
  'kolpokowsol/request-consultation',
  'kolpokowsol/contact',

  'kolpoporisor/overview',
  'kolpoporisor/services',
  'kolpoporisor/projects',
  'kolpoporisor/projects/[id]',
  'kolpoporisor/gallery',
  'kolpoporisor/team',
  'kolpoporisor/insights',
  'kolpoporisor/request-consultation',
  'kolpoporisor/contact',

  'inex/overview',
  'inex/products',
  'inex/products/[id]',
  'inex/brands',
  'inex/categories',
  'inex/catalog',
  'inex/projects',
  'inex/gallery',
  'inex/team',
  'inex/request-quotation',
  'inex/contact',

  'insights',
  'insights/news',
  'insights/articles',
  'insights/press-releases',

  'careers',
  'careers/life-at-onp',
  'careers/benefits',
  'careers/open-positions',
  'careers/open-positions/[id]',
  'careers/application',
  'careers/recruitment-process',

  'contact/office-locations',
  'contact/departments',
  'contact/contact-form',
  'contact/business-hours',

  'search',
  'coming-soon',
  'maintenance',

  'legal/privacy-policy',
  'legal/terms-and-conditions',
  'legal/cookie-policy',
  'legal/accessibility',
  'legal/sitemap',
  'legal/disclaimer'
];

function generatePageTemplate(routeName) {
  // Convert route string to a readable title
  const title = routeName.split('/').pop().replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  return `export default function ${title.replace(/[^a-zA-Z0-9]/g, '')}Page() {
  return (
    <div className="container mx-auto px-6 py-24 min-h-[60vh] flex flex-col items-center justify-center text-center">
      <h1 className="font-heading text-4xl md:text-5xl uppercase tracking-widest mb-4">
        ${title}
      </h1>
      <p className="text-muted-foreground text-lg">
        This page is currently under construction.
      </p>
    </div>
  );
}
`;
}

routes.forEach(route => {
  const routePath = path.join(appDir, route);
  const filePath = path.join(routePath, 'page.tsx');
  
  // Create directories if they don't exist
  if (!fs.existsSync(routePath)) {
    fs.mkdirSync(routePath, { recursive: true });
  }

  // Create page.tsx if it doesn't exist (don't overwrite existing ones)
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, generatePageTemplate(route));
    console.log(`Created: ${route}/page.tsx`);
  }
});

// Create not-found.tsx
const notFoundPath = path.join(appDir, 'not-found.tsx');
if (!fs.existsSync(notFoundPath)) {
  fs.writeFileSync(notFoundPath, `import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container mx-auto px-6 py-24 min-h-[60vh] flex flex-col items-center justify-center text-center">
      <h1 className="font-heading text-8xl md:text-9xl font-bold uppercase tracking-tighter mb-4 text-primary">
        404
      </h1>
      <h2 className="font-heading text-2xl md:text-3xl uppercase tracking-widest mb-8">
        Page Not Found
      </h2>
      <Link 
        href="/" 
        className="px-8 py-4 bg-foreground text-background font-medium uppercase tracking-wide rounded-full hover:bg-primary transition-colors"
      >
        Return Home
      </Link>
    </div>
  );
}
`);
  console.log('Created: not-found.tsx');
}

// Create basic backend folder structure
const backendFolders = ['features', 'services', 'db'];
backendFolders.forEach(folder => {
  const folderPath = path.join(projectRoot, folder);
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
    fs.writeFileSync(path.join(folderPath, '.gitkeep'), '');
    console.log(`Created backend folder: ${folder}`);
  }
});

console.log('Scaffolding complete.');
