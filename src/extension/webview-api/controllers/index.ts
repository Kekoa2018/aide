import type { Controller } from '../types'
import { AIModelController } from './ai-model-controller'
import { AIProviderController } from './ai-provider-controller'
import { ApplyController } from './apply-controller'
import { ChatController } from './chat-controller'
import { ChatSessionController } from './chat-session-controller'
import { CodebaseController } from './codebase-controller'
import { DocController } from './doc-controller'
import { FileController } from './file-controller'
import { GitController } from './git-controller'
import { SettingsController } from './settings-controller'
import { SystemController } from './system-controller'

export const controllers = [
  ChatController,
  CodebaseController,
  FileController,
  GitController,
  SystemController,
  DocController,
  ChatSessionController,
  ApplyController,
  SettingsController,
  AIProviderController,
  AIModelController
] as const satisfies (typeof Controller)[]
export type Controllers = typeof controllers