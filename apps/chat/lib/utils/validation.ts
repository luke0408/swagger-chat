export const validateSwaggerUrl = (url: string): string | null => {
  // URL 형식 검증
  try {
    new URL(url);
  } catch {
    return 'Invalid URL format';
  }

  // Swagger 문서 URL 패턴 검증
  const validEndpoints = ['/swagger.json', '/api-docs', '/openapi.json'];
  if (!validEndpoints.some(endpoint => url.includes(endpoint))) {
    return 'URL must point to a Swagger/OpenAPI documentation';
  }

  return null;
}

export const validateSwaggerFile = (file: File): boolean => {
  console.log('Validating file:', {
    name: file.name,
    type: file.type,
    size: file.size
  });

  // 파일 크기 제한 (10MB)
  if (file.size > 10 * 1024 * 1024) {
    console.warn('File size exceeds 10MB');
    return false;
  }

  // 파일 확장자 검증
  const fileName = file.name.toLowerCase();
  const validExtensions = ['.json', '.yaml', '.yml'];
  const hasValidExtension = validExtensions.some(ext => fileName.endsWith(ext));

  console.log('File validation result:', {
    hasValidExtension,
    fileName
  });

  return hasValidExtension;
};