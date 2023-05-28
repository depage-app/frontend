import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

export default function NetworkSelect({
  value,
  onChange,
  networks,
}: {
  value: string;
  onChange: (value: string) => void;
  networks: Network[];
}) {
  return (
    <Select value={value} onValueChange={onChange} name="network">
      <SelectTrigger>
        <SelectValue placeholder="Polygon" />
      </SelectTrigger>
      <SelectContent>
        {networks.map((network) => (
          <SelectItem
            key={network.id}
            value={network.id}
            disabled={network.disabled}
          >
            {network.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
