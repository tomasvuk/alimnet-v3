-- Allow admins to read system events for analytics
CREATE POLICY "Allow admins to read system events" ON public.system_events
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  )
);
