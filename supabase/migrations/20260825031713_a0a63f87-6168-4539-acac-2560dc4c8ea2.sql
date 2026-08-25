CREATE TABLE public.laia_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  name TEXT,
  business_type TEXT,
  problem TEXT,
  recommended_solution TEXT,
  tools TEXT,
  urgency TEXT,
  contact TEXT,
  conversation_summary TEXT
);

GRANT INSERT ON public.laia_leads TO anon;
GRANT INSERT ON public.laia_leads TO authenticated;
GRANT ALL ON public.laia_leads TO service_role;

ALTER TABLE public.laia_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a lead" ON public.laia_leads FOR INSERT TO anon, authenticated WITH CHECK (true);