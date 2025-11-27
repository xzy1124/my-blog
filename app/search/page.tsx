import React, { Suspense } from 'react'
import SearchClient from '@/components/SearchClient'

// Server page — renders a client search component inside Suspense.
export default function SearchPage() {
  return (
    <React.Fragment>
      <Suspense fallback={<div className="p-6">加载搜索组件…</div>}>
        <SearchClient />
      </Suspense>
    </React.Fragment>
  )
}
