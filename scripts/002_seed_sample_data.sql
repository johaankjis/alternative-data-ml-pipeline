-- Insert sample dataset
INSERT INTO datasets (name, description, row_count, column_count, status, metadata)
VALUES 
  ('Alternative Data Sample', 'Sample alternative data for predictive modeling', 1000, 15, 'active', 
   '{"source": "web_scraping", "date_range": "2024-01-01 to 2024-12-31"}'),
  ('Financial Indicators', 'Economic and financial indicators dataset', 500, 20, 'active',
   '{"source": "api", "frequency": "daily"}');

-- Insert sample features
INSERT INTO features (dataset_id, feature_name, feature_type, transformation, is_target)
VALUES
  (1, 'price', 'numeric', 'log', FALSE),
  (1, 'volume', 'numeric', 'sqrt', FALSE),
  (1, 'sentiment_score', 'numeric', 'none', FALSE),
  (1, 'category', 'categorical', 'one_hot', FALSE),
  (1, 'target_return', 'numeric', 'none', TRUE);

-- Insert sample model
INSERT INTO models (name, dataset_id, model_type, hyperparameters, status, feature_config)
VALUES
  ('XGBoost Baseline', 1, 'xgboost', 
   '{"max_depth": 6, "learning_rate": 0.1, "n_estimators": 100, "subsample": 0.8}',
   'completed',
   '{"features": ["price", "volume", "sentiment_score"], "target": "target_return"}');

-- Insert sample experiment results
INSERT INTO experiments (model_id, experiment_name, train_accuracy, test_accuracy, train_rmse, test_rmse, r2_score, training_time_seconds, metrics)
VALUES
  (1, 'Baseline Run', 0.8542, 0.7823, 0.1234, 0.1567, 0.7234, 45,
   '{"precision": 0.82, "recall": 0.79, "f1_score": 0.80}');

-- Insert sample feature importance
INSERT INTO feature_importance (model_id, feature_name, importance_score, importance_type)
VALUES
  (1, 'sentiment_score', 0.4523, 'gain'),
  (1, 'volume', 0.3012, 'gain'),
  (1, 'price', 0.2465, 'gain');
