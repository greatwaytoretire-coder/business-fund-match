"use client";

import React from 'react';
import { FundingOption } from '../types';
import Link from 'next/link';

interface ResultsProps {
  matches: any[];
  onReset: () => void;
}

export default function Results({ matches, onReset }: ResultsProps) {
  // Separate highly eligible matches from low matches to make the UI clean
  const highMatches = matches.filter(m => m.isEligible || m.score >= 70);
  const lowMatches = matches.filter(m => !m.isEligible && m.score < 70);

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4 pb-12">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
          Your Funding Matches Are Ready
        </h2>
        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
          Our engine analyzed your pre-qualification baselines against current programmatic lending criteria.
        </p>
        <button
          onClick={onReset}
          className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors"
        >
          ← Retake Assessment Quiz
        </button>
      </div>

      {/* High/Eligible Matches Section */}
      {highMatches.length > 0 ? (
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-emerald-800 bg-emerald-50 px-4 py-2 rounded-lg inline-block">
            ✔ Recommended Pre-Qualified Options ({highMatches.length})
          </h3>
          
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
            {highMatches.map((match) => (
              <div 
                key={match.option.seoSlug}
                className="relative bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                {/* Match Badge */}
                <div className="absolute top-4 right-4 bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">
                  {match.score}% Match
                </div>

                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 block mb-1">
                    {match.option.type.replace(/_/g, ' ')}
                  </span>
                  <h4 className="text-xl font-bold text-gray-900 pr-16 mb-2">
                    {match.option.name}
                  </h4>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-6">
                    {match.option.description}
                  </p>
                </div>

                <div className="border-t border-gray-100 pt-4 mt-4">
                  <div className="flex justify-between items-center text-sm mb-4">
                    <span className="text-gray-500">Max Funding Limit:</span>
                    <span className="font-semibold text-gray-900">
                      ${match.option.maxAmount.toLocaleString()}
                    </span>
                  </div>

                  <Link
                    href={`/${match.option.seoSlug}`}
                    className="block text-center w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-xl transition-colors shadow-sm text-sm"
                  >
                    View Terms & Apply
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-center max-w-xl mx-auto">
          <h3 className="text-lg font-bold text-amber-800 mb-2">No High Matches Found</h3>
          <p className="text-amber-700 text-sm">
            Your current business metrics fall slightly below our core lenders' automatic baselines. Try adjusting your requested funding amount or checking back as revenue grows.
          </p>
        </div>
      )}

      {/* Potential/Low Matches Section */}
      {lowMatches.length > 0 && (
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-bold text-gray-500 mb-4">
            Alternative Options (Additional Verification Required)
          </h3>
          <div className="bg-gray-50 rounded-2xl divide-y divide-gray-100 border border-gray-100 overflow-hidden">
            {lowMatches.map((match) => (
              <div 
                key={match.option.seoSlug} 
                className="p-4 sm:flex items-center justify-between hover:bg-gray-100/50 transition-colors"
              >
                <div className="mb-3 sm:mb-0">
                  <h4 className="text-base font-bold text-gray-800">{match.option.name}</h4>
                  <p className="text-xs text-gray-500">Requires alternative credit combinations • Match score: {match.score}%</p>
                </div>
                <Link
                  href={`/${match.option.seoSlug}`}
                  className="inline-block text-center bg-white border border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-1.5 px-4 rounded-lg transition-colors text-xs"
                >
                  Review Criteria
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}