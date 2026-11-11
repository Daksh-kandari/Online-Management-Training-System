import React, { createContext, useContext, useState, useEffect } from 'react';
import { Training, TrainingRequest, TrainingCategory, TrainingStatus, RequestStatus } from '../types';
import {
  getStoredTrainings,
  saveStoredTrainings,
  getStoredRequests,
  saveStoredRequests,
  INITIAL_TRAININGS,
  INITIAL_REQUESTS,
} from '../utils/storage';

interface TrainingContextType {
  trainings: Training[];
  requests: TrainingRequest[];
  addTraining: (data: Omit<Training, 'id' | 'createdAt' | 'enrolledCount'>) => Training;
  updateTraining: (id: string, updates: Partial<Training>) => void;
  toggleTrainingStatus: (id: string, newStatus: TrainingStatus) => void;
  deleteTraining: (id: string) => void;
  enrollInTraining: (id: string) => { success: boolean; message: string };
  addRequest: (data: Omit<TrainingRequest, 'id' | 'submittedAt' | 'status'>) => TrainingRequest;
  updateRequestStatus: (id: string, status: RequestStatus, notes?: string) => void;
  getRequestsByCategory: (category: TrainingCategory | 'All') => TrainingRequest[];
  resetToDefaultData: () => void;
}

const TrainingContext = createContext<TrainingContextType | undefined>(undefined);

export const TrainingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [requests, setRequests] = useState<TrainingRequest[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadedTrainings = getStoredTrainings();
    const loadedRequests = getStoredRequests();
    setTrainings(loadedTrainings);
    setRequests(loadedRequests);
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      saveStoredTrainings(trainings);
    }
  }, [trainings, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      saveStoredRequests(requests);
    }
  }, [requests, isLoaded]);

  const addTraining = (data: Omit<Training, 'id' | 'createdAt' | 'enrolledCount'>): Training => {
    const newTraining: Training = {
      ...data,
      id: `trn-${Date.now()}`,
      enrolledCount: 0,
      createdAt: new Date().toISOString(),
    };
    setTrainings((prev) => [newTraining, ...prev]);
    return newTraining;
  };

  const updateTraining = (id: string, updates: Partial<Training>) => {
    setTrainings((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const toggleTrainingStatus = (id: string, newStatus: TrainingStatus) => {
    setTrainings((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
  };

  const deleteTraining = (id: string) => {
    setTrainings((prev) => prev.filter((item) => item.id !== id));
  };

  const enrollInTraining = (id: string): { success: boolean; message: string } => {
    const target = trainings.find((t) => t.id === id);
    if (!target) return { success: false, message: 'Training not found' };
    if (target.status === 'Cancelled') {
      return { success: false, message: 'Cannot enroll in a cancelled training session' };
    }
    if (target.enrolledCount >= target.maxSeats) {
      return { success: false, message: 'This training session is fully booked' };
    }
    setTrainings((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, enrolledCount: item.enrolledCount + 1 } : item
      )
    );
    return { success: true, message: `Successfully registered for "${target.title}"!` };
  };

  const addRequest = (
    data: Omit<TrainingRequest, 'id' | 'submittedAt' | 'status'>
  ): TrainingRequest => {
    const newRequest: TrainingRequest = {
      ...data,
      id: `req-${Date.now()}`,
      status: 'Pending',
      submittedAt: new Date().toISOString(),
    };
    setRequests((prev) => [newRequest, ...prev]);
    return newRequest;
  };

  const updateRequestStatus = (id: string, status: RequestStatus, notes?: string) => {
    setRequests((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status,
              ...(notes !== undefined ? { adminNotes: notes } : {}),
            }
          : item
      )
    );
  };

  const getRequestsByCategory = (category: TrainingCategory | 'All'): TrainingRequest[] => {
    if (category === 'All') return requests;
    return requests.filter((req) => req.category === category);
  };

  const resetToDefaultData = () => {
    setTrainings(INITIAL_TRAININGS);
    setRequests(INITIAL_REQUESTS);
    saveStoredTrainings(INITIAL_TRAININGS);
    saveStoredRequests(INITIAL_REQUESTS);
  };

  return (
    <TrainingContext.Provider
      value={{
        trainings,
        requests,
        addTraining,
        updateTraining,
        toggleTrainingStatus,
        deleteTraining,
        enrollInTraining,
        addRequest,
        updateRequestStatus,
        getRequestsByCategory,
        resetToDefaultData,
      }}
    >
      {children}
    </TrainingContext.Provider>
  );
};

export function useTrainings(): TrainingContextType {
  const context = useContext(TrainingContext);
  if (!context) {
    throw new Error('useTrainings must be used within a TrainingProvider');
  }
  return context;
}
