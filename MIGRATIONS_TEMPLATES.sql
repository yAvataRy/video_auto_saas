-- Criar tabela templates
CREATE TABLE templates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  content TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('short-form', 'long-form', 'promotional', 'educational', 'entertainment', 'other')),
  thumbnail_url TEXT,
  is_public BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar Row Level Security
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;

-- Policy para SELECT (usuários veem seus templates + templates públicos de outros)
CREATE POLICY "Users can view own and public templates" ON templates
  FOR SELECT USING (auth.uid() = user_id OR is_public = TRUE);

-- Policy para INSERT (usuários só criam templates para si)
CREATE POLICY "Users can create own templates" ON templates
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy para UPDATE (usuários só editam seus próprios templates)
CREATE POLICY "Users can update own templates" ON templates
  FOR UPDATE USING (auth.uid() = user_id);

-- Policy para DELETE (usuários só deletam seus próprios templates)
CREATE POLICY "Users can delete own templates" ON templates
  FOR DELETE USING (auth.uid() = user_id);

-- Criar índices para melhor performance
CREATE INDEX idx_templates_user_id ON templates(user_id);
CREATE INDEX idx_templates_category ON templates(category);
CREATE INDEX idx_templates_is_public ON templates(is_public);
CREATE INDEX idx_templates_created_at ON templates(created_at DESC);

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_templates_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para atualizar updated_at
CREATE TRIGGER update_templates_updated_at_trigger
  BEFORE UPDATE ON templates
  FOR EACH ROW
  EXECUTE FUNCTION update_templates_updated_at();

-- Criar tabela project_templates (relação many-to-many)
CREATE TABLE project_templates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  template_id UUID NOT NULL REFERENCES templates(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(project_id, template_id)
);

-- Habilitar Row Level Security em project_templates
ALTER TABLE project_templates ENABLE ROW LEVEL SECURITY;

-- Policy para project_templates (usuários só acessam após autorização de projeto)
CREATE POLICY "Users can access project templates through project" ON project_templates
  FOR ALL USING (
    project_id IN (
      SELECT id FROM projects WHERE user_id = auth.uid()
    )
  );

-- Criar índices
CREATE INDEX idx_project_templates_project_id ON project_templates(project_id);
CREATE INDEX idx_project_templates_template_id ON project_templates(template_id);
