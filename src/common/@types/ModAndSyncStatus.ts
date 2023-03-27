import ModContents from './ModContents'

export type SyncStatus = 'synced' | 'not_synced' | 'missing_bootfiles' | 'static'

export default interface ModAndSyncStatus {
    name: string
    status: SyncStatus
    contents: ModContents
}
