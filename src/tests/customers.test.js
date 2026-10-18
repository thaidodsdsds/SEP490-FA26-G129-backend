import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import app from '../app.js';
import dataSource from '../database/dataSource.js';

describe('Customer API', () => {
  beforeAll(async () => {
    await dataSource.initialize();
    await dataSource.query('DELETE FROM customers');
  });

  afterAll(async () => {
    if (dataSource.isInitialized) {
      await dataSource.destroy();
    }
  });

  it('creates a customer successfully', async () => {
    const response = await request(app)
      .post('/api/v1/customers')
      .send({
        name: 'Nguyen Van A',
        email: 'nguyenvana@example.com',
        phone: '0901234567',
      });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.email).toBe('nguyenvana@example.com');
  });

  it('returns 409 for duplicate email', async () => {
    const response = await request(app)
      .post('/api/v1/customers')
      .send({
        name: 'Nguyen Van A',
        email: 'nguyenvana@example.com',
        phone: '0901234567',
      });

    expect(response.status).toBe(409);
    expect(response.body.error.code).toBe('CONFLICT');
  });
});
