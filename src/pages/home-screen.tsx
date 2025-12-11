import { useState } from "react";
import { Form } from "@/components/base/form/form";
import { Select } from "@/components/base/select/select";
import { SelectItem } from "@/components/base/select/select-item";

type DifficultLevel = "begginer" | "adept" | "expert" | "master";

export const HomeScreen = () => {
  const [difficult, setDifficult] = useState<DifficultLevel | null>(null);
  const [completedKillTasks, setCompletedKillTasks] = useState<number>(1);
  const [completedDeliveryTasks, setCompletedDeliveryTasks] = useState<number>(1);

  const deliveryTaskPoints = 75;
  const totalCompletedTasks = completedKillTasks + completedDeliveryTasks;

  const pointsbyDifficult = {
    begginer: 25,
    adept: 50,
    expert: 100,
    master: 110,
  };

  const handleMultiplier = () => {
    if (!difficult) return 1;

    console.log("Total Completed Tasks:", totalCompletedTasks);

    if (totalCompletedTasks >= 4 && totalCompletedTasks < 8) {
      return 2;
    } else if (totalCompletedTasks >= 8 && totalCompletedTasks < 12) {
      return 3;
    } else if (totalCompletedTasks >= 12 && totalCompletedTasks < 16) {
      return 5;
    } else if (totalCompletedTasks >= 16) {
      return 8;
    }

    return 1;
  };

  const calculatePoints = () => {
    if (!difficult || !completedKillTasks || !completedDeliveryTasks) return 0;

    const pointsPerTask = pointsbyDifficult[difficult] || 0;

    console.log(handleMultiplier());

    return (completedKillTasks * pointsPerTask + completedDeliveryTasks * deliveryTaskPoints) * handleMultiplier();
  };

  return (
    <div className="mx-auto flex h-dvh w-full max-w-7xl flex-col gap-12 p-14 text-gray-blue-50">
      <header className="flex items-start justify-between">
        <div>
          <h1 className="mb-4 text-3xl font-bold">Hunting Tasks Points Calculator</h1>
          <p className="text-lg">Seja bem-vindo(a)!👋 Saiba quantos pontos você poderá ganhar com base na dificuldade escolhida.</p>
        </div>

        <span className="invisible mt-1 text-sm text-gray-blue-400 md:visible">
          <i>Made by Lukke</i> 🧙🏼‍♂️
        </span>
      </header>

      <section>
        <Form className="flex w-full flex-col gap-6 lg:flex-row lg:justify-between lg:gap-10">
          <Select
            className="w-full"
            size="sm"
            label="Qual a dificuldade escolhida?"
            placeholder="Selecione a dificuldade"
            onChange={(value) => setDifficult(value as DifficultLevel)}
          >
            <SelectItem id="begginer">Begginer</SelectItem>
            <SelectItem id="adept">Adept</SelectItem>
            <SelectItem id="expert">Expert</SelectItem>
            <SelectItem id="master">Master</SelectItem>
          </Select>

          <Select
            className="w-full"
            size="sm"
            label="Quantas Kill Tasks finalizadas?"
            placeholder="Selecione a quantidade"
            onChange={(value) => setCompletedKillTasks(Number(value))}
          >
            {Array.from({ length: 9 }, (_, i) => String(i + 1)).map((num) => (
              <SelectItem key={num} id={num}>
                {num}
              </SelectItem>
            ))}
          </Select>

          <Select
            className="w-full"
            size="sm"
            label="Quantas Delivery Tasks finalizadas?"
            placeholder="Selecione a quantidade"
            onChange={(value) => setCompletedDeliveryTasks(Number(value))}
          >
            {Array.from({ length: 9 }, (_, i) => String(i + 1)).map((num) => (
              <SelectItem key={num} id={num}>
                {num}
              </SelectItem>
            ))}
          </Select>
        </Form>
      </section>

      <div className="flex flex-col gap-4 rounded-lg bg-gray-blue-800 p-6">
        <span className="text-2xl">
          Total de Hunting Tasks Points {"->"} {calculatePoints()}
        </span>

        <span className="text-2xl">
          Total de Soulseals {"->"} {totalCompletedTasks}
        </span>
      </div>

      <span className="visible mx-auto mt-1 text-sm text-gray-blue-400 md:invisible">
        <i>Made by Lukke</i> 🧙🏼‍♂️
      </span>
    </div>
  );
};
