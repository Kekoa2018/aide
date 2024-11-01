import type { Range, Uri } from 'vscode'

import type { HistoryManager } from './history-manager'

export enum InlineDiffTaskState {
  Idle = 'Idle',
  Applying = 'Applying',
  Rejected = 'Rejected',
  Finished = 'Finished',
  Error = 'Error',
  Pending = 'Pending'
}

export interface DiffBlock {
  id: string
  type: 'add' | 'remove' | 'no-change'
  oldStart: number
  oldLines: string[]
  newStart: number
  newLines: string[]
}

export interface DiffBlockWithRange extends DiffBlock {
  displayRange: Range
  status: 'pending' | 'accept' | 'reject'
  renderedLines: string[]
}

export interface DiffEdit {
  blockId: string
  editType: 'accept' | 'reject'
}

export interface DiffAction {
  id: string
  edits: DiffEdit[]
  timestamp: number
}

export interface InlineDiffTask {
  id: string
  state: InlineDiffTaskState
  selectionRange: Range
  selectionContent: string
  contentAfterSelection: string
  replacementContent: string
  originalFileUri: Uri
  diffBlocks: DiffBlock[]
  abortController?: AbortController
  error?: Error
  lastKnownDocumentVersion: number
  waitForReviewDiffBlockIds: string[]
  history: HistoryManager
}