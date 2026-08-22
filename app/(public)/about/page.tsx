import ScrollReveal from '@/app/components/ScrollReveal';

export default function AboutPage() {
  const interests = [
    "Software Engineering", "Late Night Coding", "Cinematic Photography",
    "UI/UX Design", "Creative Writing", "AI Experiments",
    "Minimalism", "Mechanical Keyboards"
  ];

  return (
    <main className="min-h-screen pb-24">
      <section className="pt-32 pb-16 px-6 border-b border-border">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal delay={0}>
            <h1 className="font-heading text-5xl md:text-7xl text-text-primary mb-6">About</h1>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-24 px-6 max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <ScrollReveal delay={100}>
            <div className="prose prose-invert prose-amber max-w-none prose-headings:font-heading">
              <h2 className="text-3xl text-text-primary mb-6">Hello, I&apos;m Soumyadip</h2>
              {/* Write your own bio here */}
              <p className="text-text-secondary leading-relaxed mb-8">
                ...
              </p>

              <h3 className="text-xl text-text-primary mb-4 font-heading">Interests &amp; Focus</h3>
              <div className="flex flex-wrap gap-2">
                {interests.map((interest) => (
                  <span 
                    key={interest} 
                    className="px-3 py-1.5 rounded-full bg-accent-amber/10 border border-accent-amber/20 text-accent-amber text-sm"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden border border-border group">
              <img 
                src="https://i.pinimg.com/736x/dc/e5/5f/dce55f226a6bfba9acd7c6718e056495.jpg" 
                alt="Atmospheric workspace" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-accent-amber/20 to-transparent mix-blend-overlay" />
              <div className="absolute inset-0 border border-white/10 rounded-2xl" />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
