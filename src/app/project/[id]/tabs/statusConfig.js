import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

export const statusConfig = {
  ready: { intent: 'success', label: 'Ready', icon: <CheckCircle size={12} /> },
  building: { intent: 'info', label: 'Building', icon: <Clock size={12} /> },
  error: { intent: 'danger', label: 'Error', icon: <AlertCircle size={12} /> },
  canceled: { intent: 'default', label: 'Canceled' },
};
