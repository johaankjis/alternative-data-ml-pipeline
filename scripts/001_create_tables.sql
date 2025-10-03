-- Create datasets table to store uploaded data information
CREATE TABLE IF NOT EXISTS datasets (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  file_path VARCHAR(500),
  row_count INTEGER,
  column_count INTEGER,
  upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(50) DEFAULT 'active',
  metadata JSONB
);

-- Create features table to store feature engineering configurations
CREATE TABLE IF NOT EXISTS features (
  id SERIAL PRIMARY KEY,
  dataset_id INTEGER REFERENCES datasets(id) ON DELETE CASCADE,
  feature_name VARCHAR(255) NOT NULL,
  feature_type VARCHAR(50), -- 'numeric', 'categorical', 'datetime', 'derived'
  transformation VARCHAR(100), -- 'log', 'sqrt', 'one_hot', 'label_encode', etc.
  is_target BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create models table to store trained model information
CREATE TABLE IF NOT EXISTS models (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  dataset_id INTEGER REFERENCES datasets(id) ON DELETE CASCADE,
  model_type VARCHAR(50) DEFAULT 'xgboost',
  hyperparameters JSONB,
  training_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(50) DEFAULT 'training', -- 'training', 'completed', 'failed'
  model_path VARCHAR(500),
  feature_config JSONB
);

-- Create experiments table to track model training runs
CREATE TABLE IF NOT EXISTS experiments (
  id SERIAL PRIMARY KEY,
  model_id INTEGER REFERENCES models(id) ON DELETE CASCADE,
  experiment_name VARCHAR(255),
  train_accuracy DECIMAL(5,4),
  test_accuracy DECIMAL(5,4),
  train_rmse DECIMAL(10,4),
  test_rmse DECIMAL(10,4),
  train_mae DECIMAL(10,4),
  test_mae DECIMAL(10,4),
  r2_score DECIMAL(5,4),
  training_time_seconds INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  metrics JSONB
);

-- Create predictions table to store model predictions
CREATE TABLE IF NOT EXISTS predictions (
  id SERIAL PRIMARY KEY,
  model_id INTEGER REFERENCES models(id) ON DELETE CASCADE,
  dataset_id INTEGER REFERENCES datasets(id) ON DELETE CASCADE,
  prediction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  predictions JSONB,
  actual_values JSONB,
  residuals JSONB
);

-- Create shap_values table to store SHAP interpretability data
CREATE TABLE IF NOT EXISTS shap_values (
  id SERIAL PRIMARY KEY,
  model_id INTEGER REFERENCES models(id) ON DELETE CASCADE,
  feature_name VARCHAR(255),
  shap_value DECIMAL(10,6),
  feature_value DECIMAL(10,6),
  sample_index INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create feature_importance table
CREATE TABLE IF NOT EXISTS feature_importance (
  id SERIAL PRIMARY KEY,
  model_id INTEGER REFERENCES models(id) ON DELETE CASCADE,
  feature_name VARCHAR(255),
  importance_score DECIMAL(10,6),
  importance_type VARCHAR(50), -- 'gain', 'weight', 'cover', 'shap'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_datasets_status ON datasets(status);
CREATE INDEX IF NOT EXISTS idx_models_dataset_id ON models(dataset_id);
CREATE INDEX IF NOT EXISTS idx_experiments_model_id ON experiments(model_id);
CREATE INDEX IF NOT EXISTS idx_predictions_model_id ON predictions(model_id);
CREATE INDEX IF NOT EXISTS idx_shap_values_model_id ON shap_values(model_id);
CREATE INDEX IF NOT EXISTS idx_feature_importance_model_id ON feature_importance(model_id);
