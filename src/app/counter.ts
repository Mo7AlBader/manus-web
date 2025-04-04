// src/app/counter.ts

// ❌ لا حاجة لـ 'use server' هنا

let pageViews = 0
let recentAccess: { accessed_at: string }[] = []

export async function incrementAndLog() {
  pageViews++

  recentAccess.unshift({
    accessed_at: new Date().toISOString()
  })

  // نحتفظ بآخر 5 زيارات فقط
  recentAccess = recentAccess.slice(0, 5)

  return {
    count: pageViews,
    recentAccess
  }
}

export async function getStats() {
  return {
    count: pageViews,
    recentAccess
  }
}
