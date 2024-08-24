import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Message {
	constructor(partial: Partial<Message>) {
		Object.assign(this, partial)
	}

	@PrimaryGeneratedColumn()
	id: number

	@Column({ type: 'varchar', length: 255 })
	text: string
}
