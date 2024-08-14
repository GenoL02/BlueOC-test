function mostFrequentStringLength(strings) {
  // Tạo đối tượng để lưu trữ tần suất của mỗi độ dài chuỗi
  const lengthFrequencies = {};

  // Duyệt từng chuỗi và lấy độ dài của chuỗi trong mảng
  for (const string of strings) {
    const length = string.length;

    // Nếu độ dài chuỗi chưa có trong đối tượng, khởi tạo tần suất là 1
    if (!lengthFrequencies[length]) {
      lengthFrequencies[length] = 1;
    } else {
      // Nếu độ dài chuỗi đã có trong đối tượng, tăng tần suất lên 1
      lengthFrequencies[length]++;
    }
  }

  // Khởi tạo tần suất lớn nhất là 0
  let maxFrequency = 0;

  // Tìm tần suất lớn nhất
  for (const length in lengthFrequencies) {
    if (lengthFrequencies[length] > maxFrequency) {
      maxFrequency = lengthFrequencies[length];
    }
  }

  // Lọc ra các chuỗi có độ dài xuất hiện với tần suất lớn nhất
  const mostFrequentStrings = strings.filter(
    (string) => lengthFrequencies[string.length] === maxFrequency
  );

  // Trả về danh sách các chuỗi có độ dài xuất hiện nhiều nhất
  return mostFrequentStrings;
}

// Các trường hợp kiểm tra
const testCases = [
  ["a", "ab", "abc", "cd", "def", "gh"],
  // Các chuỗi có độ dài xuất hiện tần xuất như nhau
  ["hello", "world", "abc", "cba", "javascript", "python"],
  ["a", "bb", "ccc", "dddd", "eeeee"],
  ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k"], // Các chuỗi đều có cùng độ dài
];

// Kiểm tra hàm với các trường hợp kiểm tra
for (const testCase of testCases) {
  console.log(`Input: ${testCase}`);
  console.log(`Output: ${mostFrequentStringLength(testCase)}`);
  console.log("---------------------");
}
