import React from 'react';

interface ResultsProps {
  data: {
    warnings: string[];
    vulnerabilities: Array<{
      severity: 'Low' | 'Medium' | 'High' | 'Critical';
      description: string;
      location: {
        start: number;
        end: number;
      };
    }>;
    gas_usage: {
      estimated_deployment_cost: number;
      estimated_function_costs: Array<[string, number]>;
    };
    complexity_score: number;
    function_complexities: Record<string, number>;
    analysis_result: string;
    analysis_time: {
      secs: number;
      nanos: number;
    };
    pattern_results: Array<{
      pattern_index: number;
      location: {
        start: number;
        end: number;
      };
    }>;
    error?: string;
  };
}

export default function Results({ data }: ResultsProps) {
  return (
    <div className="mt-8 w-full max-w-4xl bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Audit Results</h2>

        {data.error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            Error: {data.error}
          </div>
        )}

        <p className="mb-4 text-gray-600 dark:text-gray-400">
          Analysis Result: {data.analysis_result}
        </p>
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          Analysis Time: {data.analysis_time.secs * 1000 + data.analysis_time.nanos / 1000000}ms
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ResultSection title="Warnings" items={data.warnings} />
          <ResultSection title="Vulnerabilities" items={data.vulnerabilities.map(v => `${v.severity}: ${v.description} (Line ${v.location.start}-${v.location.end})`)} />
        </div>

        <GasUsageSection gasUsage={data.gas_usage} />

        <ComplexitySection
          complexityScore={data.complexity_score}
          functionComplexities={data.function_complexities}
        />

        <PatternResultsSection patternResults={data.pattern_results} />
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

function PatternResultsSection({ patternResults }: { patternResults: ResultsProps['data']['pattern_results'] }) {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">Pattern Results</h3>
      <ul className="list-disc list-inside space-y-1">
        {patternResults.map((result, index) => (
          <li key={index} className="text-gray-600 dark:text-gray-400">
            Pattern {result.pattern_index}: Line {result.location.start}-{result.location.end}
          </li>
        ))}
      </ul>
    </div>
  );
}
