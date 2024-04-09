// 비동기 함수의 반환값을 추출하는 유틸리틸 함수
export type AsyncReturnType<T extends (...args: any) => any> = Awaited<
  ReturnType<T>
>;
