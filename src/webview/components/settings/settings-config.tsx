import {
  settingsConfig as sharedSettingsConfig,
  type SettingCategory,
  type SettingsConfigItem
} from '@shared/utils/settings-config'

import { CodebaseIndexing } from './custom-renders/codebase'
import { DocManagement } from './custom-renders/doc-management'
import type { SettingItem, SettingsConfig } from './types'

const convertToUIConfig = () => {
  const settingsByCategory = Object.entries(sharedSettingsConfig).reduce(
    (acc, [key, setting]) => {
      const { category } = setting
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category]!.push({
        saveType: setting.saveType,
        key,
        label: setting.label,
        description: setting.description,
        type: setting.type,
        options: ((setting as SettingsConfigItem)?.options ?? []).map(option =>
          typeof option === 'string' ? { label: option, value: option } : option
        ),
        defaultValue: setting.defaultValue
      })
      return acc
    },
    {} as Record<string, SettingItem[]>
  ) as Record<SettingCategory, SettingItem[]>

  // Define standalone categories
  const categories = [
    {
      id: 'general',
      label: 'General',
      settings: settingsByCategory.general || []
    }
  ]

  // Define groups and their categories
  const groups = [
    {
      id: 'chat',
      label: 'Chat',
      categories: [
        {
          id: 'chatGeneral',
          label: 'General',
          settings: [
            {
              key: 'codebase',
              label: 'Codebase Indexing',
              description: 'Manage codebase indexing for AI features',
              type: 'custom',
              customRenderer: () => <CodebaseIndexing />
            }
          ]
        }
      ]
    },
    {
      id: 'management',
      label: 'Management',
      categories: [
        {
          id: 'docManagement',
          label: 'Doc Management',
          settings: [
            {
              key: 'docManagement',
              label: 'Manage Documentation Sites',
              description:
                'Add, remove, and manage documentation sites for indexing',
              type: 'custom',
              customRenderer: () => <DocManagement />
            }
          ]
        }
      ]
    },
    {
      id: 'tools',
      label: 'Tools',
      categories: [
        {
          id: 'copyAsPrompt',
          label: 'Copy As Prompt',
          settings: settingsByCategory.copyAsPrompt || []
        },
        {
          id: 'codeConvert',
          label: 'Code Convert',
          settings: settingsByCategory.codeConvert || []
        },
        {
          id: 'codeViewerHelper',
          label: 'Code Viewer Helper',
          settings: settingsByCategory.codeViewerHelper || []
        },
        {
          id: 'expertCodeEnhancer',
          label: 'Expert Code Enhancer',
          settings: settingsByCategory.expertCodeEnhancer || []
        },
        {
          id: 'smartPaste',
          label: 'Smart Paste',
          settings: settingsByCategory.smartPaste || []
        },
        {
          id: 'askAI',
          label: 'Ask AI',
          settings: settingsByCategory.askAI || []
        }
      ]
    }
  ]

  return {
    title: 'Settings',
    groups,
    categories // Add standalone categories
  } as SettingsConfig
}

export const settingsConfig = convertToUIConfig()
