'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui';

interface ProductCarouselControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function ProductCarouselControls({
  currentPage,
  totalPages,
  onPageChange,
}: ProductCarouselControlsProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-green bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-green">
        Showing page {currentPage + 1} of {totalPages}
      </p>

      <div className="flex items-center gap-2">
        <Button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 0}
          variant="ghost"
          className="flex items-center gap-1 rounded-xl border border-green px-3 py-2 text-sm font-medium text-green transition hover:bg-green/10 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>

        <Button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages - 1}
          variant="ghost"
          className="flex items-center gap-1 rounded-xl border border-green px-3 py-2 text-sm font-medium text-green transition hover:bg-green/10 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
