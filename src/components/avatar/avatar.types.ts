export interface AvatarProps {
  size: string
  isEditable?: AvatarEditable
  src?: string
}

export enum AvatarEditable {
  true = 'avatar__container_editable',
  false = ''
}
