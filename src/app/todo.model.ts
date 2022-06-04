export class ToDoItem {
  label: string;
  description: string | undefined;
  inProgress: boolean = false;
  completed: boolean = false;
  started: Date | undefined;
  duration: number | undefined;

  private loop: any;

  constructor(label: string, description?: string) {
    this.label = label;

    if (description)
      this.description = description;
  }


  start() {
    this.duration = 0;
    this.completed = false;
    this.inProgress = true;

    this.started = new Date();
    this.loop = setInterval(this.tick.bind(this), 1000);
  }

  complete() {
    this.inProgress = false;
    this.completed = true;

    clearInterval(this.loop);
    delete this.loop;
    this.tick();

    // const end = new Date();
    // if (this.started) {
    //   this.duration = end.getTime() - this.started.getTime()
    // } else {
    //   this.duration = 0;
    // }
  }

  private tick() {
    if (this.started)
      this.duration = new Date().getTime() - this.started.getTime();
  }
}
