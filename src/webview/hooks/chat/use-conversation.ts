import { useCallback } from 'react'
import type { Conversation } from '@webview/types/chat'
import { useImmer } from 'use-immer'
import { v4 as uuidv4 } from 'uuid'

export const getDefaultConversation = (role: Conversation['role']) => ({
  id: uuidv4(),
  createdAt: Date.now(),
  role,
  content: '',
  attachments: {
    codeContext: {
      codeChunks: [],
      tmpCodeChunk: []
    },
    codebaseContext: {
      relevantCodeSnippets: []
    },
    docContext: {
      enableTool: false,
      allowSearchDocSiteUrls: [],
      relevantDocs: []
    },
    fileContext: {
      selectedFiles: [],
      selectedFolders: [],
      selectedImages: []
    },
    gitContext: {
      gitCommits: [],
      gitDiffs: [],
      gitPullRequests: []
    },
    webContext: {
      enableTool: false,
      webSearchResults: []
    }
  }
})

export const useConversation = (role: Conversation['role'] = 'human') => {
  const [conversation, setConversation] = useImmer<Conversation>(
    getDefaultConversation(role)
  )

  const resetConversation = useCallback(() => {
    setConversation(getDefaultConversation(role))
  }, [role, setConversation])

  return {
    conversation,
    setConversation,
    resetConversation
  }
}