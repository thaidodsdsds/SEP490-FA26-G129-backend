export const buildSuccessResponse = (data, meta = null) => ({
  success: true,
  data,
  meta,
});

export const buildErrorResponse = (message, code = 'INTERNAL_ERROR', details = null) => ({
  success: false,
  error: {
    code,
    message,
    details,
  },
});
