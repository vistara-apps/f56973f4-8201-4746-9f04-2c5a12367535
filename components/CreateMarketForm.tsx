'use client';

import { useState } from 'react';
import { Plus, Clock, DollarSign } from 'lucide-react';
import { useMarkets } from '@/lib/hooks';

interface MarketFormData {
  eventDescription: string;
  outcomeYes: string;
  outcomeNo: string;
  duration: number;
  initialValue: number;
}

export function CreateMarketForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createMarket } = useMarkets();
  const [formData, setFormData] = useState<MarketFormData>({
    eventDescription: '',
    outcomeYes: '',
    outcomeNo: '',
    duration: 60, // minutes
    initialValue: 100,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const result = await createMarket({
        creatorId: 'current-user', // In production, get from auth context
        streamId: 'current-stream', // In production, get from current stream context
        eventDescription: formData.eventDescription,
        outcomeYes: formData.outcomeYes,
        outcomeNo: formData.outcomeNo,
        duration: formData.duration,
        initialValue: formData.initialValue,
      });

      if (result.success) {
        // Reset form
        setFormData({
          eventDescription: '',
          outcomeYes: '',
          outcomeNo: '',
          duration: 60,
          initialValue: 100,
        });
        setIsOpen(false);
      } else {
        console.error('Error creating market:', result.error);
        // In production, show error toast
      }
    } catch (error) {
      console.error('Error creating market:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof MarketFormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  if (!isOpen) {
    return (
      <div className="card">
        <button
          onClick={() => setIsOpen(true)}
          className="w-full flex items-center justify-center space-x-2 py-4 text-primary hover:text-blue-400 transition-colors duration-200"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">Create New Market</span>
        </button>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Create Market</h3>
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-400 hover:text-white"
        >
          ×
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Prediction Question
          </label>
          <textarea
            value={formData.eventDescription}
            onChange={(e) => handleInputChange('eventDescription', e.target.value)}
            placeholder="e.g., Will the next donation be over $100?"
            className="input-field w-full h-20 resize-none"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              YES Outcome
            </label>
            <input
              type="text"
              value={formData.outcomeYes}
              onChange={(e) => handleInputChange('outcomeYes', e.target.value)}
              placeholder="Over $100"
              className="input-field w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              NO Outcome
            </label>
            <input
              type="text"
              value={formData.outcomeNo}
              onChange={(e) => handleInputChange('outcomeNo', e.target.value)}
              placeholder="Under $100"
              className="input-field w-full"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Clock className="w-4 h-4 inline mr-1" />
              Duration (minutes)
            </label>
            <select
              value={formData.duration}
              onChange={(e) => handleInputChange('duration', parseInt(e.target.value))}
              className="input-field w-full"
            >
              <option value={15}>15 minutes</option>
              <option value={30}>30 minutes</option>
              <option value={60}>1 hour</option>
              <option value={120}>2 hours</option>
              <option value={240}>4 hours</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <DollarSign className="w-4 h-4 inline mr-1" />
              Initial Value
            </label>
            <input
              type="number"
              value={formData.initialValue}
              onChange={(e) => handleInputChange('initialValue', parseInt(e.target.value))}
              min="10"
              max="10000"
              step="10"
              className="input-field w-full"
              required
            />
          </div>
        </div>

        <div className="pt-4 border-t border-gray-700">
          <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
            <span>Estimated Gas Fee:</span>
            <span className="text-white">~$2.50</span>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="btn-secondary w-full"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary w-full"
              disabled={isSubmitting || !formData.eventDescription.trim()}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                  <span>Creating...</span>
                </div>
              ) : (
                'Create Market'
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
