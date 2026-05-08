import { useState, useRef } from 'react';
import { validateAdminCode } from '@/app/actions/validateAdminCode';

export function useCodeGate() {
  const [open, setOpen]       = useState(false);
  const [error, setError]     = useState(false);
  const [loading, setLoading] = useState(false);
  const pending = useRef<(() => void) | null>(null);

  function request(action: () => void) {
    pending.current = action;
    setError(false);
    setOpen(true);
  }

  async function confirm(code: string) {
    setLoading(true);
    const ok = await validateAdminCode(code);
    setLoading(false);
    if (ok) {
      pending.current?.();
      pending.current = null;
      setOpen(false);
      setError(false);
    } else {
      setError(true);
    }
  }

  function cancel() {
    pending.current = null;
    setOpen(false);
    setError(false);
  }

  return { open, error, loading, request, confirm, cancel };
}
