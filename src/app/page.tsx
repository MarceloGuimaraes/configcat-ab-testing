import EnvironmentInfo from '@/components/EnvironmentInfo';
import ABTestDisplay from '@/components/ABTestDisplay';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            ConfigCat A/B Testing Demo
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Demonstração de uma aplicação React + Next.js integrada ao ConfigCat 
            para realização de testes A/B com Percentage Rollout.
          </p>
        </header>

        {/* Environment Information */}
        <section>
          <EnvironmentInfo />
        </section>

        {/* A/B Test Display */}
        <section>
          <ABTestDisplay />
        </section>

        {/* Footer */}
        <footer className="text-center mt-12 py-8 border-t border-gray-200">
          <div className="text-gray-600">
            <p className="mb-2">
              <strong>Tecnologias utilizadas:</strong> React, Next.js, TypeScript, ConfigCat, CSS Modules
            </p>
            <p className="text-sm">
              Esta aplicação demonstra como implementar testes A/B de forma profissional 
              usando feature flags e segmentação de usuários.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

