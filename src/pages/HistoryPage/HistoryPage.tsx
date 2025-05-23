import { useContext } from "react";
import { HistoryContainer, HistoryList, Status } from "./styles";
import { CycleContext } from "../../context/CycleContext";

import {ptBR} from 'date-fns/locale/pt-BR'

import { formatDistanceToNow } from 'date-fns'

export function HistoryPage() {

	const { cycles } = useContext(CycleContext)



	return (
		<HistoryContainer>
			<h1>Meu histórico</h1>

			<HistoryList>
				<table>
					<thead>
						<tr>
							<th>Tarefa</th>
							<th>Duração</th>
							<th>Início</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						{
							cycles.map((cycle) => {
								return (
									<tr key={cycle.id}>
										<td>{cycle.task}</td>
										<td>{cycle.minutesAmount} minutos</td>
										<td>{formatDistanceToNow(cycle.startData, {
											addSuffix: true,
											locale: ptBR

										}
										)}</td>
										<td>
											{cycle.finishedDate && (
												<Status statusColor="green">Concluído</Status>
											)}

											{cycle.interruptedData &&
												(<Status statusColor="red">Interrompido</Status>
												)}

											{(!cycle.finishedDate && !cycle.interruptedData) &&
												(<Status statusColor="yellow">Em andamento</Status>

												)}

										</td>
									</tr>
								)
							})
						}

					</tbody>
				</table>
			</HistoryList>
		</HistoryContainer>
	)
}