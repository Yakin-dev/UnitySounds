ALTER TABLE public.contact_messages
ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS contact_messages_user_id_idx ON public.contact_messages(user_id);

CREATE POLICY "Users can view their own messages"
ON public.contact_messages
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);
