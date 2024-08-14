function sum(numbers) {
  // Kiểm tra xem mảng có ít nhất 2 phần tử hay không
  if (numbers.length < 2) {
    return numbers[0]; // Trả về phần tử duy nhất trong mảng nếu có 1 phần tử
  }

  // Sắp xếp mảng theo thứ tự giảm dần
  numbers.sort((a, b) => b - a);

  // Trả về tổng của 2 phần tử lớn nhất
  return numbers[0] + numbers[1];
}

// Các trường hợp kiểm tra
const testCases = [
  [1, 4, 2, 3, 5],
  [10, 20, 30, 40, 50],
  [1, 1, 1, 1, 1],
  [100, 50, 25, 75, 10],
  [], // Mảng rỗng
  [1], // Mảng có 1 phần tử
];

// Kiểm tra hàm với các trường hợp kiểm tra
for (const testCase of testCases) {
  console.log(`Input: ${testCase}`);
  console.log(`Output: ${sum(testCase)}`);
  console.log("---------------------");
}
