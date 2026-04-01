-- Adicionar coluna scheduled_at à tabela projects
ALTER TABLE projects ADD COLUMN scheduled_at TIMESTAMP WITH TIME ZONE;

-- Criar índice para melhor performance em queries de agendamento
CREATE INDEX idx_projects_scheduled_at ON projects(scheduled_at) 
WHERE scheduled_at IS NOT NULL;

-- Criar índice composto para filtrar projetos agendados por usuário
CREATE INDEX idx_projects_user_scheduled ON projects(user_id, scheduled_at)
WHERE scheduled_at IS NOT NULL;
