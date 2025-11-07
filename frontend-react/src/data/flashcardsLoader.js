// src/data/flashcardsLoader.js
// Utility to fetch flashcard topics from a Google Drive file (expected JSON),
// with a safe fallback to built-in demo topics.

export const defaultTopics = [
  {
    id: 1,
    name: 'Chào hỏi',
    flashcards: [
      { id: 1, front: 'Xin chào', back: 'Hello', image: null },
      { id: 2, front: 'Tạm biệt', back: 'Goodbye', image: null },
      { id: 3, front: 'Cảm ơn', back: 'Thank you', image: null },
      { id: 4, front: 'Xin lỗi', back: 'Sorry', image: null },
      { id: 5, front: 'Không có gì', back: "You're welcome", image: null },
    ],
  },
  {
    id: 2,
    name: 'Gia đình',
    flashcards: [
      { id: 6, front: 'Mẹ', back: 'Mother', image: null },
      { id: 7, front: 'Cha', back: 'Father', image: null },
      { id: 8, front: 'Anh trai', back: 'Brother', image: null },
      { id: 9, front: 'Chị gái', back: 'Sister', image: null },
      { id: 10, front: 'Ông bà', back: 'Grandparents', image: null },
    ],
  },
  {
    id: 3,
    name: 'Động vật',
    flashcards: [
      {
        id: 11,
        front: 'Con ngựa',
        back: 'Hai tay nắm, lòng bàn tay úp đặt trước ngực, tay trái bên ngoài, tay phải bên trong, đưa đồng thời hai tay ra-vào (2 lần).',
        image: null,
      },
      {
        id: 12,
        front: 'Con gà',
        back: 'Tay trái khép, lòng bàn tay ngửa đặt trước ngực. Tay phải giống chữ Đ, lòng bàn tay úp, gập cổ tay chạm đầu ngón trỏ vào lòng bàn tay trái (2 lần).',
        image: null,
      },
      {
        id: 13,
        front: 'Con chó',
        back: 'Hai tay khép, lòng bàn tay hướng về trước, đặt chạm vào hai bên đầu, gập đồng thời hai cổ tay lên xuống (2 lần).',
        image: null,
      },
      {
        id: 14,
        front: 'Con gà trống',
        back: 'Tay phải khép, ngón cái mở ra đặt chạm ngón tay cái vào giữa trán rồi đưa qua đỉnh đầu; tay trái khép, lòng bàn tay ngửa đặt trước ngực, tay phải giống chữ Đ chạm đầu ngón trỏ vào lòng bàn tay trái (2 lần).',
        image: null,
      },
      {
        id: 15,
        front: 'Con bò',
        back: 'Hai tay giống chữ Đ, lòng bàn tay hướng về trước đặt áp vào hai bên thái dương.',
        image: null,
      },
      {
        id: 16,
        front: 'Con lợn',
        back: 'Tay phải giống chữ V, lòng bàn tay úp đặt chạm vào dưới cằm, đưa hai ngón tay lần lượt lên xuống (2 lần).',
        image: null,
      },
      {
        id: 17,
        front: 'Con trâu',
        back: 'Hai tay giống chữ Y, lòng bàn tay hướng về trước đặt ngang thái dương, đưa đồng thời hai tay theo đường vòng cung hướng lên trên.',
        image: null,
      },
      {
        id: 18,
        front: 'Con mèo',
        back: 'Hai tay mở, ngón cái và ngón trỏ chạm vào nhau đặt gần khóe miệng, đưa hai tay về hai phía (2 lần).',
        image: null,
      },
    ],
  },
];

export async function fetchFlashcardTopicsFromDrive(fileId) {
  try {
    // Public link: https://drive.google.com/file/d/<ID>/view
    // Download endpoint:
    const url = `https://drive.google.com/uc?id=${fileId}&export=download`;
    const res = await fetch(url, { cache: 'no-cache' });
    if (!res.ok) return null;
    const text = await res.text();
    // Some Drive responses wrap JSON in HTML; try to parse JSON substring
    const jsonStart = text.indexOf('{');
    const jsonEnd = text.lastIndexOf('}');
    const payload = JSON.parse(text.slice(jsonStart, jsonEnd + 1));
    // Expected structure: [{ id, name, flashcards: [{id, front, back, image}] }]
    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload?.topics)) return payload.topics;
    return null;
  } catch (e) {
    console.warn('Failed to load topics from Drive, using defaults', e);
    return null;
  }
}


