import React from 'react';

interface ResultsProps {
  data: {
    warnings: string[];
    vulnerabilities: Array<{
      severity: 'Low' | 'Medium' | 'High' | 'Critical';
      description: string;
    }>;
    gas_usage: {
      estimated_deployment_cost: number;
      estimated_function_costs: Array<[string, number]>;
    };
    complexity_score: number;
    function_complexities: Record<string, number>;
  };
}

export default function Results({ data }: ResultsProps) {
  return (
    <div className="mt-8 w-full max-w-4xl bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Audit Results</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ResultSection title="Warnings" items={data.warnings} />
          <ResultSection title="Vulnerabilities" items={data.vulnerabilities.map(v => `${v.severity}: ${v.description}`)} />
        </div>
        
        <GasUsageSection gasUsage={data.gas_usage} />
        
        <ComplexitySection 
          complexityScore={data.complexity_score} 
          functionComplexities={data.function_complexities} 
        />
      </div>
    </div>
  );
}

function ResultSection({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">{title}</h3>
      <ul className="list-disc list-inside space-y-1">
        {items.map((item, index) => (
          <li key={index} className="text-gray-600 dark:text-gray-400">{item}</li>
        ))}
      </ul>
    </div>
  );
}

function GasUsageSection({ gasUsage }: { gasUsage: ResultsProps['data']['gas_usage'] }) {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">Gas Usage</h3>
      <p className="text-gray-600 dark:text-gray-400">Estimated Deployment Cost: {gasUsage.estimated_deployment_cost}</p>
      <h4 className="text-md font-semibold mt-2 mb-1 text-gray-700 dark:text-gray-300">Function Costs:</h4>
      <ul className="list-disc list-inside space-y-1">
        {gasUsage.estimated_function_costs.map(([func, cost], index) => (
          <li key={index} className="text-gray-600 dark:text-gray-400">{func}: {cost}</li>
        ))}
      </ul>
    </div>
  );
}

function ComplexitySection({ complexityScore, functionComplexities }: { complexityScore: number; functionComplexities: Record<string, number> }) {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">Complexity Analysis</h3>
      <p className="text-gray-600 dark:text-gray-400">Overall Complexity Score: {complexityScore}</p>
      <h4 className="text-md font-semibold mt-2 mb-1 text-gray-700 dark:text-gray-300">Function Complexities:</h4>
      <ul className="list-disc list-inside space-y-1">
        {Object.entries(functionComplexities).map(([func, complexity], index) => (
          <li key={index} className="text-gray-600 dark:text-gray-400">{func}: {complexity}</li>
        ))}
      </ul>
    </div>
  );
}
