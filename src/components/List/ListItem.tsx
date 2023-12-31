import { Column } from "components/Column"
import { Text } from "components/Text"

export type ListItemProps = {
  label: string
}

export const ListItem: React.FC<ListItemProps> = ({label}) => {
  return(
    <Column width="100%" bg="rgba(0,0,0,0.2)" p="20px" marginBottom="10px" borderRadius="4px" borderLeft="4px solid #fff">
      <Text>{label}</Text>
    </Column>
  )
}