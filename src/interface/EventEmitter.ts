import StrictEventEmitter from 'strict-event-emitter-types'
import {EventEmitter} from 'events'
import { FileDTO } from '@/model/dto/File'

interface EventFile {
  fileSelected: (fileDTO: FileDTO) => void
}

export type FileEventType = StrictEventEmitter<EventEmitter, EventFile>

interface EventWindow {
  switchFocusable: () => void
}

export type WindowEventType = StrictEventEmitter<EventEmitter, EventWindow>